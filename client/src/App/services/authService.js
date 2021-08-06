export default {
  isAuthenticated() {
    const token = localStorage.getItem("userTicket");
    if (token) {
      return true;
    } else {
      return false;
    }
  },
};
