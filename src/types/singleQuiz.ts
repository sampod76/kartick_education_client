export IAnswer={
    title: string;
    serialNumber?: number;
    correct?: boolean;
    imgs?: Array<string>;
    status: 'active' | 'deactivate' | 'save';
  }

  export type IQuizType = 'input' | 'select' | 'multiple_select' | 'text';
export type ISingleQuiz = {
    title: string;
    imgs?: string[];
    details?: string;
    short_description?: string;
    hints?: string;
    serialNumber?: number;
    time_duration?: number; // milliseconds
    answers?: IAnswer[];
    single_answer?: string;
    type: IQuizType;
    //
    quiz: string;
    author?: string;
    module: string
    status: 'active' | 'deactivate' | 'save';
    demo_video?: Record<string, string>;
    tags?: string[];
  };