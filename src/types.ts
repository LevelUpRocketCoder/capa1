export type Language = 'ES' | 'EN';

export interface NavMenuLink {
  label: string;
  url: string;
}

export interface NavMenuItem {
  title: string;
  links: NavMenuLink[];
}

export interface PartnerBrand {
  name?: string;
  logoText: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  division: 'galleteria' | 'navidad';
  spec?: string;
}

export interface OfficeLocation {
  region?: string;
  city?: string;
  name?: string;
  role?: string;
  address: string;
  phone: string;
  email: string;
}

export interface TranslationSet {
  aboutUs: string;
  partnering: string;
  ourProducts: string;
  letsConnect: string;
  downloadBrochure: string;
  chatWithUs: string;
  heroSub: string;
  heroTitle: string;
  heroSubBakery: string;
  heroTitleBakery: string;
  heroSubDeli: string;
  heroTitleDeli: string;
  aboutTitle: string;
  aboutBody: string;
  readMore: string;
  partneringTitle: string;
  trustedSourcing: string;
  trustedSourcingDesc: string;
  foodSafety: string;
  foodSafetyDesc: string;
  operationalEfficiency: string;
  operationalEfficiencyDesc: string;
  expertSupport: string;
  expertSupportDesc: string;
  quotationTitle: string;
  quotationSubtitle: string;
  nameField: string;
  emailField: string;
  phoneField: string;
  messageField: string;
  submitBtn: string;
  successMsg: string;
  contactHeader: string;
}
