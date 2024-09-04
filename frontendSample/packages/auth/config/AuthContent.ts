// Todo move to dictionary
export const AuthContent = {
  successMessages: {
    signIn: (user: any) =>
      user && user.id
        ? `Welcome back${user && user.fullName ? ` ${user?.fullName}` : ""}!`
        : "Welcome back!",
    signUp: () => "Your sign-up is complete. Let the games begin!",
    resetPassword: () =>
      "Your password has been reset successfully. Enjoy your stay.",
  },
}
