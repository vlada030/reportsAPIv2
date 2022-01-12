import { elements } from "../elementsList";
import { deleteMessage, showMessage } from "./alertMessagesHandler";
import errorHandler from "./errorHandler";
import { displayFileSize } from "../utils";
import {
    updateUserDetail,
    deleteUserAvatar,
    updateForgottenPassword,
} from "./ajaxRequestsHandler";

export const updateUserName = () => {
    elements.submitName.addEventListener("click", async (e) => {
        e.preventDefault();

        deleteMessage();

        const name = elements.name.value;

        try {
            const user = await updateUserDetail("update", { name });
            showMessage("Korisničko ime uspešno promenjeno.", "success");

            setTimeout(() => {
                location.assign("/api/v2/auth/me");
            }, 1500);
        } catch (error) {
            errorHandler(error);
        }
    });
};
export const updateUserEmail = () => {
    elements.submitEmail.addEventListener("click", async (e) => {
        e.preventDefault();

        deleteMessage();

        const email = elements.email.value;

        try {
            const user = await updateUserDetail("update", { email });
            showMessage("Korisnički email je uspešno promenjen.", "success");

            setTimeout(() => {
                location.assign("/api/v2/auth/me");
            }, 1500);
        } catch (error) {
            errorHandler(error);
        }
    });
};

export const updateUserPassword = () => {
    elements.submitPassword.addEventListener("click", async (e) => {
        e.preventDefault();
        deleteMessage();

        const currentPassword = elements.currentPassword.value;
        const newPassword = elements.newPassword.value;

        try {
            const user = await updateUserDetail("updatepassword", {
                currentPassword,
                newPassword,
            });
            // console.log(user);
            showMessage("Korisnička šifra je uspešno promenjena.", "success");

            setTimeout(() => {
                location.assign("/api/v2/auth/me");
            }, 1500);
        } catch (error) {
            errorHandler(error);
        }
    });
};

export const displayAvatarImgProperties = () => {
    elements.avatar.addEventListener("change", () => {
        // dodeli fajl
        const file = elements.avatar.files[0];
        // update UI
        elements.avatarDesc.innerText = `${file.name}  ${displayFileSize(
            file.size
        )}`;
        elements.avatarImg.src = URL.createObjectURL(file);
    });
};

export const updateUserAvatarImg = () => {
    elements.submitAvatar.addEventListener("click", async (e) => {
        e.preventDefault();
        deleteMessage();

        let form = new FormData();
        form.append("avatar", elements.avatar.files[0]);

        try {
            const user = await updateUserDetail("avatar", form);
            showMessage("Profilna slika je uspešno promenjena.", "success");

            setTimeout(() => {
                location.assign("/api/v2/auth/me");
            }, 1500);
        } catch (error) {
            errorHandler(error);
        }
    });
};

export const restoreDefaultAvatarImg = () => {
    elements.restoreAvatar.addEventListener("click", async (e) => {
        e.preventDefault();
        deleteMessage();

        try {
            const user = await deleteUserAvatar();

            showMessage("Profilna slika je izbrisana.", "success");

            setTimeout(() => {
                location.assign("/api/v2/auth/me");
            }, 1500);
        } catch (error) {
            errorHandler(error);
        }
    });
};

export const changeForgottenUserPassword = () => {
    elements.submitForgottenPassword.addEventListener("click", async (e) => {
        e.preventDefault();
        deleteMessage();

        const password = elements.forgottenPassword.value;
        const currentUrl = window.location.href;

        try {
            const user = await updateForgottenPassword(currentUrl, password);
            showMessage(
                "Šifra je uspešno promenjena. Ulogujte se ponovo.",
                "success"
            );
            setTimeout(() => {
                window.close();
            }, 1500);
        } catch (error) {
            errorHandler(error);
        }
    });
};
