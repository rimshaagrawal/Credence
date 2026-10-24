import { Switch, Route } from "wouter";
import { Toaster } from "sonner";
import LandingPage from "@/pages/LandingPage";
import CandidateDashboard from "@/pages/CandidateDashboard";
import EmployerDashboard from "@/pages/EmployerDashboard";
import PublicProfile from "@/pages/PublicProfile";
import ClaimDetail from "@/pages/ClaimDetail";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/candidate" component={CandidateDashboard} />
        <Route path="/employer" component={EmployerDashboard} />
        <Route path="/profile/:slug" component={PublicProfile} />
        <Route path="/claim/:id" component={ClaimDetail} />
        <Route component={NotFound} />
      </Switch>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--color-bg)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text)",
            fontFamily: "var(--font-body)",
          },
        }}
      />
    </>
  );
}
