export const signout = (req, res, next) => {
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
        });
        res.status(200).json({ message: "User signed out successfully" });
    } catch (error) {
        next(error);
    }
};