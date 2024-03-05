import React from 'react'

export default function ActivitiesPage() {
    return (
        <div>
            <div className="flex flex-wrap justify-between p-4 space-y-4 md:space-y-0 container mx-auto text-white">
                <div className="w-full md:w-1/2 bg-blue-700 p-4 rounded">
                    <h2 className="text-2xl font-bold mb-4">SIGN UP FOR LIVE CLUBS!</h2>
                    <p className="text-base">
                        Students have the opportunity to meet live each week with a teacher and peers. Enjoy learning something new while connecting with friends each week! Our live clubs are available to our IBLossomlearn students for a simple $25 student yearly registration fee. If a club has different age groups, you will be placed based on grade level. Club fee of $25 per student will be billed when the club begins. Along with email, you will receive an email from your club(s) teacher with a Zoom link to use for that particular club. Emails are always from a <a href="https://iblossomlearn.com/">https://iblossomlearn.com/</a>
                    </p>
                </div>

                <div className="w-full md:w-1/2 bg-[#e9c328] p-4 rounded">
                    <h2 className="text-2xl font-bold mb-4">How Do I Sign Up?</h2>
                    <p className="text-base">
                        You can use the Live Clubs Signup button. You will be asked the information below. If you have a question about supplemental activities such as the Live Clubs, use the Live Clubs Question button. We will try to answer as quickly as possible.
                    </p>
                    <p className="text-base font-semibold">
                        Your email address. <br />
                        Student name. <br />
                        Grade level. <br />
                        Club(s) that you would like to enroll in.
                    </p>
                    <div className="border-t mt-4 pt-4">
                        {/* You can add your Live Clubs Signup and Live Clubs Question buttons here */}
                    </div>
                </div>
            </div>
        </div>
    )
}
