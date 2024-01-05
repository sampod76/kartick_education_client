import jwtDecode from "jwt-decode";

export const decodedToken = (token:string) => {
    return jwtDecode(token)
}

//! -------- Pipeline stage --------------------------------
const pipeline: PipelineStage[] =
isModule === 'yes'
  ? milestonePipeline.moduleList({
      whereConditions,
      sortConditions,
      limit,
      skip,
    })
  : milestonePipeline.onlyMilestone({
      whereConditions,
      sortConditions,
      limit,
      skip,
    });
//! -------- end --------------------------------

const pipeline: PipelineStage[] = [
    { $match: whereConditions },
    { $sort: sortConditions },

    {
      $lookup: {
        from: 'courses',
        let: { id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$category', '$$id'] },
                  { $eq: ['$status', ENUM_STATUS.ACTIVE] },
                ], // The condition to match the fields
              },
            },
          },
          // Additional stages for collection2
          {
            $lookup: {
              from: 'milestones',
              let: { id: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ['$course', '$$id'] },
                        { $eq: ['$status', ENUM_STATUS.ACTIVE] },
                      ], // The condition to match the fields
                    },
                  },
                },
                // Additional stages for collection2
                {
                  $lookup: {
                    from: 'modules',
                    let: { id: '$_id' },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $and: [
                              { $eq: ['$milestone', '$$id'] },
                              { $eq: ['$status', ENUM_STATUS.ACTIVE] },
                            ], // The condition to match the fields
                          },
                        },
                      },
                      // Additional stages for collection2
                      {
                        $lookup: {
                          from: 'lessons',
                          let: { id: '$_id' },
                          pipeline: [
                            {
                              $match: {
                                $expr: {
                                  $and: [
                                    { $eq: ['$module', '$$id'] },
                                    { $eq: ['$status', ENUM_STATUS.ACTIVE] },
                                  ], // The condition to match the fields
                                },
                              },
                            },
                            // Additional stages for collection2
                            {
                              $lookup: {
                                from: 'quizzes',
                                let: { id: '$_id' },
                                pipeline: [
                                  {
                                    $match: {
                                      $expr: {
                                        $and: [
                                          { $eq: ['$lesson', '$$id'] },
                                          {
                                            $eq: [
                                              '$status',
                                              ENUM_STATUS.ACTIVE,
                                            ],
                                          },
                                        ], // The condition to match the fields
                                      },
                                    },
                                  },
                                  // Additional stages for collection2

                                  {
                                    $project: {
                                      title: 1,
                                      img: 1,
                                    },
                                  },
                                ],
                                as: 'quizzes',
                              },
                            },
                            {
                              $project: {
                                title: 1,
                                lesson_number: 1,
                                img: 1,
                                quizzes: 1,
                              },
                            },
                          ],
                          as: 'lessons',
                        },
                      },
                      {
                        $project: {
                          title: 1,
                          img: 1,
                          lessons: 1,
                          module_number: 1,
                        },
                      },
                    ],
                    as: 'modules',
                  },
                },

                {
                  $project: {
                    title: 1,
                    img: 1,
                    milestone_number: 1,
                    modules: 1,
                  },
                },
              ],
              as: 'milestones',
            },
          },

          {
            $project: {
              title: 1,
              img: 1,
              snid: 1,
              milestones: 1,
            },
          },
        ],
        as: 'courses',
      },
    },
    // { $limit: Number(limit) || 15 },
  ];