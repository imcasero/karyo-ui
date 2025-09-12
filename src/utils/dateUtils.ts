/**
 * Utility functions for handling dates consistently across the application
 */

/**
 * Converts a date string to YYYY-MM-DD format for HTML date inputs
 * Handles both ISO strings and other date formats
 */
export const formatDateForInput = (dateString: string): string => {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    return date.toISOString().split("T")[0];
  } catch {
    // Fallback to current date if parsing fails
    return new Date().toISOString().split("T")[0];
  }
};

/**
 * Converts a date input value (YYYY-MM-DD) to ISO string format for API calls
 * This ensures we always send full ISO datetime format to the API
 */
export const formatDateForAPI = (dateInput: string): string => {
  try {
    // Create date from YYYY-MM-DD format
    const date = new Date(dateInput + "T00:00:00.000Z");

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date input");
    }

    return date.toISOString();
  } catch {
    // Fallback to current date
    return new Date().toISOString();
  }
};

/**
 * Formats a date string for display in the UI
 * Handles both ISO strings and other date formats
 */
export const formatDateForDisplay = (dateString: string): string => {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Invalid date";
  }
};
