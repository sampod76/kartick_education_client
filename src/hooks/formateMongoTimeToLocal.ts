function formatMongoCreatedAtDate(timestamp: string): string {
    const date = new Date(timestamp);
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options as any);
  
    return formattedDate;
  }
  
//   const updatedAt = '2023-12-16T20:18:27.259Z';
//   const formattedDate = formatMongoCreatedAtDate(updatedAt);
//   console.log(formattedDate);

export default formatMongoCreatedAtDate