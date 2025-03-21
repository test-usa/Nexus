function getAccountId() {
  const pendoData = sessionStorage.getItem(
    "pendo_sessionLastUserInteractionEvent"
  );
  if (pendoData) {
    try {
      const parsedData = JSON.parse(pendoData);
      console.log("Retrieved accountId:", parsedData.accountId);
      return parsedData.accountId || null;
    } catch (error) {
      console.error("Error parsing account ID:", error);
      return null;
    }
  }
  console.log("No pendo data found in sessionStorage.");
  return null;
}
export default getAccountId;
