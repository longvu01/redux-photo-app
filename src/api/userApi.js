import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const userApi = {
  getMe: () => {
    // Call API to get current user
    return new Promise((resolve, reject) => {
      // reject(new Error('New Error'));
      // return;
      // Wait 500ms -> return result
      setTimeout(() => {
        const currentUser = firebase.auth().currentUser;

        resolve({
          id: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email,
          photoUrl: currentUser.photoURL,
        });
      }, 500);
    });
  },
};

export default userApi;
