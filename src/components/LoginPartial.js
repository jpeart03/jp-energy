import { Button, CircularProgress } from "@material-ui/core";

const LoginPartial = ({ user, loading, handleLogIn, handleLogOut }) => {
  if (loading) {
    return <CircularProgress color="secondary" size="1.5rem" />;
  } else {
    return (
      <>
        {user ? (
          <>
            <span style={{ marginRight: "1rem" }}>{user.email}</span>
            <Button color="inherit" onClick={handleLogOut}>
              Log out
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={handleLogIn}>
            Log in
          </Button>
        )}
      </>
    );
  }
};

export default LoginPartial;
