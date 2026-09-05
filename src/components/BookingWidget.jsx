import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export const BookingWidget = () => {
  const calLink = import.meta.env.VITE_CAL_LINK;

  useEffect(() => {
    if (!calLink) return;
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "auto",
        styles: { branding: { brandColor: "#20b2a6" } },
        hideEventTypeDetails: false,
      });
    })();
  }, [calLink]);

  if (!calLink) {
    return (
      <div className="glass rounded-2xl p-6 text-sm text-muted-foreground">
        Booking widget not configured yet — set{" "}
        <code className="text-primary">VITE_CAL_LINK</code> in your{" "}
        <code className="text-primary">.env</code> file (see README).
      </div>
    );
  }

  return (
    <div className="w-full min-h-[600px] rounded-2xl overflow-hidden bg-surface">
      <Cal
        calLink={calLink}
        style={{ width: "100%", height: "600px", overflow: "scroll" }}
        config={{ theme: "auto" }}
      />
    </div>
  );
};