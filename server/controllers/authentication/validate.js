export default async function validateEmailDomain(email) {
    const domain = "walchandsangli.ac.in";
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[\w]{2,}$/;
  
    if (emailRegex.test(email)) {
      const [, domainPart] = email.split('@');
      return domainPart === domain;
    }
  
    return false;
  }