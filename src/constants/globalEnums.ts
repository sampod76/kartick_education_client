export enum ENUM_STATUS {
  ACTIVE = 'active',
  DEACTIVATE = 'deactivate',
  SAVE = 'save',
  BLOCK = 'block',
}
export enum ENUM_YN {
  YES = 'yes',
  NO = 'no',
}
export enum ENUM_SORT_ORDER {
  ASC = 'asc',
  DESC = 'desc',
}

// 'pending' | 'accept' | 'reject' | 'complete'|'cancel'
export enum ENUM_BOOKING_STATUS {
  PENDING = 'pending',
  ACCEPT = 'accept',
  REJECT = 'reject',
  COMPLETE = 'complete',
  CANCEL = 'cancel',
}

export enum ENUM_VIDEO_PLATFORM {
  VIMEO = 'vimeo',
  YOUTUBE = 'youtube',
  FACEBOOK = 'facebook',
}

export enum ENUM_CATEGORY_CHILDREN {
  COURSE = 'course',
  COURSE_MILESTONE = 'course-milestone',
  COURSE_MILESTONE_MODULE = 'course-milestone-module',
  COURSE_MILESTONE_MODULE_LESSONS = 'course-milestone-module-lessons',
}

export enum ENUM_MIMETYPE {
  pdf = 'application/pdf',
  doc1 = 'application/msword',
  doc2 = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ppt1 = 'application/vnd.ms-powerpoint',
  ppt2 = 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  xls1 = 'application/vnd.ms-excel',
  xls2 = 'application/vnd.openxmlformats-officedocument.spreadsheetml',
}
