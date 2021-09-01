import { Button, CircularProgress } from "@material-ui/core";

const AuthTest = ({ user, loading, handleLogIn, handleLogOut }) => {
  if (loading) {
    return <CircularProgress color="secondary" />;
  } else {
    return (
      <>
        {user ? (
          <>
            <span>{user.email}</span>
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

export default AuthTest;
