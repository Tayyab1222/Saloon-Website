import { useState, useEffect } from 'react';
import { GoogleReviewsResponse, GoogleReview } from '../types';
import { BUSINESS_INFO } from '../config/business';
import { MANUAL_REVIEWS, ReviewItem } from '../data/reviews';

const GOOGLE_PLACE_MAPS_URL = "https://www.google.com/maps/place/?q=place_id:ChIJExw-Ti3rdUgRjs5g8_7oe0U";

function mapManualReviewsToGoogle(manualList: ReviewItem[]): GoogleReview[] {
  return manualList.map((item) => ({
    author_name: item.name && item.name.trim() !== '' ? item.name : "SHINY'S CLIENT",
    rating: item.rating || 5,
    text: item.text,
    relative_time_description: item.date || undefined,
    source: item.source || undefined,
  }));
}

export function useGoogleReviews() {
  const defaultFallbackReviews = mapManualReviewsToGoogle(MANUAL_REVIEWS);

  const [data, setData] = useState<GoogleReviewsResponse>({
    success: true,
    configured: true,
    rating: 5.0,
    user_ratings_total: MANUAL_REVIEWS.length,
    googleMapsUrl: BUSINESS_INFO.googleMapsUrl || GOOGLE_PLACE_MAPS_URL,
    reviews: defaultFallbackReviews,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchReviews() {
      try {
        setLoading(true);
        const res = await fetch('/api/google-reviews');
        if (res.ok) {
          const json: GoogleReviewsResponse = await res.json().catch(() => ({} as GoogleReviewsResponse));
          if (isMounted) {
            if (json.success && Array.isArray(json.reviews) && json.reviews.length > 0) {
              setData({
                success: true,
                configured: true,
                rating: json.rating ?? 5.0,
                user_ratings_total: json.user_ratings_total || json.reviews.length,
                googleMapsUrl: json.googleMapsUrl || GOOGLE_PLACE_MAPS_URL,
                reviews: json.reviews,
                message: json.message,
              });
            } else {
              // Fall back to manual reviews silently
              setData({
                success: true,
                configured: true,
                rating: 5.0,
                user_ratings_total: MANUAL_REVIEWS.length,
                googleMapsUrl: json.googleMapsUrl || GOOGLE_PLACE_MAPS_URL,
                reviews: defaultFallbackReviews,
              });
            }
            setError(null);
          }
        } else {
          if (isMounted) {
            setData({
              success: true,
              configured: true,
              rating: 5.0,
              user_ratings_total: MANUAL_REVIEWS.length,
              googleMapsUrl: GOOGLE_PLACE_MAPS_URL,
              reviews: defaultFallbackReviews,
            });
            setError(null);
          }
        }
      } catch (_err) {
        if (isMounted) {
          setData({
            success: true,
            configured: true,
            rating: 5.0,
            user_ratings_total: MANUAL_REVIEWS.length,
            googleMapsUrl: GOOGLE_PLACE_MAPS_URL,
            reviews: defaultFallbackReviews,
          });
          setError(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}

