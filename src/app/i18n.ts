
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// The translations
const resources = {
  en: {
    translation: {
      "تسجيل الدخول": "Login",
      "البريد الإلكتروني": "Email",
      "كلمة المرور": "Password",
      "هل نسيت كلمة المرور؟": "Forgot password?",
      "تسجيل الدخول باستخدام جوجل": "Login with Google",
      "ليس لديك حساب؟": "Don't have an account?",
      "إنشاء حساب": "Sign up",
      "تسجيل الدخول إلى AchoX Pro AI": "Login to AchoX Pro AI",
      "أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك": "Enter your email below to login to your account",
      // Add other translations here
    }
  },
  ar: {
    translation: {
      "تسجيل الدخول": "تسجيل الدخول",
      "البريد الإلكتروني": "البريد الإلكتروني",
      "كلمة المرور": "كلمة المرور",
      "هل نسيت كلمة المرور؟": "هل نسيت كلمة المرور؟",
      "تسجيل الدخول باستخدام جوجل": "تسجيل الدخول باستخدام جوجل",
      "ليس لديك حساب؟": "ليس لديك حساب؟",
      "إنشاء حساب": "إنشاء حساب",
      "تسجيل الدخول إلى AchoX Pro AI": "تسجيل الدخول إلى AchoX Pro AI",
      "أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك": "أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك",
      // Add other translations here
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'ar', // default language
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
