
// In a real application, this would be a more sophisticated system involving a proper auth provider,
// user roles stored in a database, and a secure way to check permissions.
// For the purpose of this prototype, we'll use a simple, hardcoded approach.

interface User {
  name: string;
  email: string;
  avatar: string;
  fallback: string;
  isAdmin: boolean;
  plan: string;
}

// Hardcoded list of admin emails
const ADMIN_EMAILS = ["marokiri8@gmail.com"];

const MOCK_USER: User = {
  name: "Maroki Ri",
  email: "marokiri8@gmail.com",
  avatar: "https://placehold.co/80x80.png",
  fallback: "MR",
  isAdmin: false, // Default value
  plan: "الخطة الاحترافية"
};

// Check if the current user's email is in the admin list
MOCK_USER.isAdmin = ADMIN_EMAILS.includes(MOCK_USER.email);
if (MOCK_USER.isAdmin) {
    MOCK_USER.plan = "خطة الشركات (مسؤول)";
}


/**
 * A hook to get the current user's data.
 * In a real app, this would likely come from a context provider or a session management library.
 */
export function useCurrentUser(): User {
  return MOCK_USER;
}
