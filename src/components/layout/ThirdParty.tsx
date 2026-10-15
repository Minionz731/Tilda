import Script from "next/script";

// Google Analytics and the Martha chat widget, as configured on the live site.
// Off unless NEXT_PUBLIC_ENABLE_THIRD_PARTY=1 so development traffic never reaches
// production analytics or the business's chat inbox. Loaded after the page is idle.
const GA_ID = "G-42L91BXEDW";
const MARTHA = "https://helpline-resources.s3.us-east-1.amazonaws.com/Martha-widget/dist";

export function ThirdParty() {
  if (process.env.NEXT_PUBLIC_ENABLE_THIRD_PARTY !== "1") return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>

      <link rel="stylesheet" href={`${MARTHA}/index.css`} />
      <Script id="martha-config" strategy="lazyOnload">
        {`window.MarthaConfig={businessId:"6aabc56a7e87965a84664ac8",position:"bottom-right",botName:"Martha",welcomeMessage:"Hello! Welcome to Tilda Bel's Haven. How can I help you today?",env:"production"};`}
      </Script>
      {/* The widget bundle expects React 18 UMD globals, exactly as on the live site. */}
      <Script src="https://unpkg.com/react@18/umd/react.production.min.js" strategy="lazyOnload" />
      <Script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" strategy="lazyOnload" />
      <Script src={`${MARTHA}/widget-loader.umd.js`} strategy="lazyOnload" />
    </>
  );
}
