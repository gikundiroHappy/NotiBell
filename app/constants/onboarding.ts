
export interface OnboardingItem {
    id: number;
    image: any;
    title: string;
    text: string;
  }

export const onboards:OnboardingItem[] = [
    {
        id:1,
        image:require('../../assets/images/onboardOne.png'),
        title:"Instant Visitor Alert",
        text:"Enhance your home security with real-time visitor notifications and remote communication right from your phone.",
    },
    {
        id:2,
        image:require('../../assets/images/onboardTwo.png'),
        title:"Never Miss a Visitor",
        text:"Receive instant mobile alerts when someone arrives and use the external LCD screen for clear visitor communication.",
    },
    {
        id:3,
        image:require('../../assets/images/onboardThree.png'),
        title:"Easy Access Anytime",
        text:"Manage your home's security anytime, anywhere with our user-friendly mobile app.",
    },
]