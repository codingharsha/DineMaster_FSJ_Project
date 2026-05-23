export const FALLBACK_FOOD_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80";

export const formatINR = (value) => {
  const amount = Number(value) || 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
};

export const getFoodId = (item) => String(item?.id ?? item?._id ?? "");

export const getFoodImageSrc = (item) =>
  item?.imgUrl || item?.imageUrl || item?.image || item?.img || FALLBACK_FOOD_IMAGE;

export const withFallbackImage = (event) => {
  const img = event.currentTarget;
  if (img.dataset.fallbackApplied === "true") return;
  img.dataset.fallbackApplied = "true";
  img.src = FALLBACK_FOOD_IMAGE;
};
