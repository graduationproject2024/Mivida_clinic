export const clinic = {
  name: {
    ar: 'عيادة Mivida',
    en: 'Mivida Clinic',
  },
  location: {
    address: {
      ar: 'طنطا، شارع البحر مع أحمد ماهر، أعلى توكيل سامسونج، المدخل بجوار توكيل vivo، الدور الثاني',
      en: 'Tanta, El Bahr St. with Ahmed Maher, Above Samsung Agency, Entrance next to vivo Agency, 2nd Floor',
    },
    googleMapsUrl: 'https://maps.app.goo.gl/aKiLVjebkfjJHNqW8',
  },
  phone: '0403408500',
  whatsappNumbers: ['01556423361', '01508192424'],
  social: {
    facebookClinic: 'https://www.facebook.com/profile.php?id=61592851045112',
    facebookDoctor: 'https://www.facebook.com/profile.php?id=100090485056768',
    instagram: 'https://www.instagram.com/dr_norhan_yousry',
    tiktok: 'https://www.tiktok.com/@norhanyousry41',
  },
  workingHours: [
    { day: 'Saturday', ar: 'السبت', open: '13:00', close: '20:00', isClosed: false },
    { day: 'Sunday', ar: 'الأحد', open: '10:00', close: '16:00', isClosed: false },
    { day: 'Monday', ar: 'الإثنين', open: '', close: '', isClosed: true },
    { day: 'Tuesday', ar: 'الثلاثاء', open: '', close: '', isClosed: true },
    { day: 'Wednesday', ar: 'الأربعاء', open: '13:00', close: '20:00', isClosed: false },
    { day: 'Thursday', ar: 'الخميس', open: '', close: '', isClosed: true },
    { day: 'Friday', ar: 'الجمعة', open: '', close: '', isClosed: true },
  ],
  availableDays: ['Saturday', 'Sunday', 'Wednesday'],
};