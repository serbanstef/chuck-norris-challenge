const sortEmails = emails => {
  const parsedArray = emails.map((email, index) => {
    return {
      email: email,
      name: email.slice(0, email.indexOf('@')),
      domain: email.slice(email.indexOf('@') + 1),
      key: index,
    };
  });

  return parsedArray
    .sort((a, b) => {
      if (a.domain < b.domain) {
        return -1;
      }
      if (a.domain > b.domain) {
        return 1;
      }
      return 0;
    })
    .sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
    .map(item => `${item.name}@${item.domain}`);
};

export default sortEmails;
