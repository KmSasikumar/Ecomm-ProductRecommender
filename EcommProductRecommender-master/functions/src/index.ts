import * as functions from "firebase-functions/v1";
import axios from "axios";

// Shape returned by the FastAPI backend's POST /recommend endpoint
// (API/main.py: RecommendationResponse). The backend requires the
// X-API-Key header and answers 403 without it.
interface RecommendationItem {
  item_id: string;
  score: number;
}

interface RecommendationResponse {
  recommendations: RecommendationItem[];
  user_id: string;
}

interface GetRecommendationsData {
  userId?: string;
  searchQuery?: string;
  count?: number;
}

const API_BASE_URL = process.env.API_URL || "http://localhost:8000";
const API_KEY = process.env.API_KEY || "testkey123";

export const getRecommendations = functions.https.onCall(
  async (data: GetRecommendationsData) => {
    const response = await axios.post<RecommendationResponse>(
      `${API_BASE_URL}/recommend`,
      {
        user_id: data?.userId || "user0",
        count: typeof data?.count === "number" ? data.count : 10,
        search_query: data?.searchQuery || "",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY,
        },
      }
    );

    // /recommend returns {recommendations: [{item_id, score}], user_id} —
    // an object, not an array, and items carry item_id (not product_id).
    // Product details are not part of this response; the app resolves them
    // from the catalog (/search), so only the id is forwarded here.
    return (response.data.recommendations || []).map((p) => ({
      product: {
        id: p.item_id,
        name: `Product ${p.item_id}`,
        price: 0,
        category: "",
        tags: [] as string[],
        imageUrls: [] as string[],
      },
      score: p.score,
      explanation: "",
    }));
  }
);
