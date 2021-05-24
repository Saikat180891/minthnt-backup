import Dashboard from "@/Dashboard";
import LeadsView from "@/Leads";

const LeadsPage = () => {
  return (
    <Dashboard>
      <LeadsView />
    </Dashboard>
  );
};

export default LeadsPage;

export async function getServerSideProps({ req, res }) {
  let isLoggedIn = false;
  const isCookieAvailable = req.cookies.token;
  if (isCookieAvailable) {
    isLoggedIn = true;
    return {
      props: { isLoggedIn },
    };
  }

  res.statusCode = 302;
  res.setHeader("Location", `/login`);

  return {
    props: {},
  };
}
