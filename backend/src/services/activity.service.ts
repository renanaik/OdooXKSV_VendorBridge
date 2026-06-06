import Activity from '../models/Activity';

export const logActivity = async (userId: string, action: string, module: string, description: string, ipAddress?: string) => {
  try {
    await Activity.create({
      user: userId,
      action,
      module,
      description,
      ipAddress,
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};
