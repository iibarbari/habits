type THabit = {
  id: string;
  title: string;
  days: Record<string, {
    timestamp: Date;
  }>
};
