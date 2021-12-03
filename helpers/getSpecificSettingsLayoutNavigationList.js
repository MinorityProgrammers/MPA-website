export const getSpecificSettingsLayoutNavigationList = (settingsPath) => {
  switch (settingsPath) {
    case "profile":
      return {
        header: "Profile Settings",
        content: [
          {
            id: 1,
            icon: "../../assets/images/settings/details-icon.svg",
            name: "Personal Details",
            subPath: "details",
          },
          {
            id: 2,
            icon: "../../assets/images/settings/overview-icon.svg",
            name: "Profile Overview",
            subPath: "overview",
          },
          {
            id: 3,
            icon: "../../assets/images/settings/media-icon.svg",
            name: "Additional Media",
            subPath: "media",
          },
          {
            id: 4,
            icon: "../../assets/images/settings/background-icon.svg",
            name: "Background",
            subPath: "background",
          },
          {
            id: 5,
            icon: "../../assets/images/settings/education-icon.svg",
            name: "Education",
            subPath: "education",
          },
        ],
      };
    case "security":
      return {
        header: "Security & Privacy Settings",
        content: [
          {
            id: 1,
            icon: "../../assets/images/settings/details-icon.svg",
            name: "Account Login",
            subPath: "login",
          },
          {
            id: 2,
            icon: "../../assets/images/settings/management-icon.svg",
            name: "Account Management",
            subPath: "management",
          },
          {
            id: 3,
            icon: "../../assets/images/settings/privacy-icon.svg",
            name: "Privacy",
            subPath: "privacy",
          },
        ],
      };
    case "wallet":
      return {
        header: "Wallet Settings",
        content: [
          {
            id: 1,
            icon: "../../assets/images/settings/wallet-icon.svg",
            name: "My Wallet",
            subPath: "my-wallet",
          },
          {
            id: 2,
            icon: "../../assets/images/settings/votes-icon.svg",
            name: "Votes",
            subPath: "votes",
          },
        ],
      };
    case "notifications":
      return {
        header: "Notification Settings",
        content: [
          {
            id: 1,
            icon: "../../assets/images/settings/notifications-icon.svg",
            name: "Notifications",
            subPath: "notifications",
          },
        ],
      };
    default:
      return {};
  }
};
