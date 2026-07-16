import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Best Bridal Makeup Artist & Luxury Salon in Patna | Jawed Habib Kurji" },
      {
        name: "description",
        content:
          "Jawed Habib Kurji is the best bridal makeup artist and luxury salon in Patna. Book premium HD, Ultra HD, Airbrush, Haldi & Sangeet, and Reception makeup packages.",
      },
      {
        name: "keywords",
        content: "best bridal makeup artist in patna, best salon in patna, jawed habib kurji patna, bridal makeup price in patna, bridal studio patna, makeup artist in patna, best bridal makeup in patna, hydrafacial in patna, hair smoothening patna, keratin treatment patna"
      },
      { name: "author", content: "Jawed Habib Kurji" },
      { property: "og:title", content: "Best Bridal Makeup Artist & Luxury Salon in Patna | Jawed Habib Kurji" },
      {
        property: "og:description",
        content:
          "Jawed Habib Kurji is the best bridal makeup artist and luxury salon in Patna. Book premium HD, Ultra HD, Airbrush, Haldi & Sangeet, and Reception makeup packages.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0D0D0D" },
      { name: "twitter:title", content: "Best Bridal Makeup Artist & Luxury Salon in Patna | Jawed Habib Kurji" },
      { name: "twitter:description", content: "Jawed Habib Kurji is the best bridal makeup artist and luxury salon in Patna. Book premium HD, Ultra HD, Airbrush, Haldi & Sangeet, and Reception makeup packages." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8971c94f-80a4-419e-9e92-fc0951930c97/id-preview-541dcdd9--7c8642a3-6049-4625-a893-19b2b2f27b49.lovable.app-1784032442735.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8971c94f-80a4-419e-9e92-fc0951930c97/id-preview-541dcdd9--7c8642a3-6049-4625-a893-19b2b2f27b49.lovable.app-1784032442735.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Jawed Habib Hair & Beauty Kurji",
    "image": "/logo.png",
    "url": "https://jawedhabibkurji.com",
    "telephone": "+919572194458",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ward 22B, Circle 247B, Holding 817A/2, Patliputra Kurji Rd, above Lenskart Outlet, opposite RBI Quarter",
      "addressLocality": "Patna",
      "addressRegion": "Bihar",
      "postalCode": "800010",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.6322",
      "longitude": "85.1014"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "10:00",
      "closes": "20:30"
    },
    "sameAs": [
      "https://www.instagram.com/jawedhabib_kurji_patna/"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "400"
    }
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd)
          }}
        />
        <script type="text/javascript" dangerouslySetInnerHTML={{
          __html: `function googleTranslateElementInit() { new google.translate.TranslateElement({pageLanguage: 'en', autoDisplay: false}, 'google_translate_element'); }`
        }} />
        <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" />
        {/* Razorpay SDK */}
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1770880150564886');
              fbq('track', 'PageView');
            `
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1770880150564886&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}


function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
