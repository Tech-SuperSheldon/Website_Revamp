"use client";

export default function RefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 mt-24 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">
        SuperSheldon Refund and Cancellation Policy
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Effective Date: 16/08/2025 | Last Updated: 16/08/2025
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p>
          This Refund and Cancellation Policy (“Policy”) governs the terms under
          which SuperSheldon (“we”, “our”, “us”, or the “Company”) will process
          cancellations, refunds, and rescheduling requests for all educational
          programs, sessions, courses, and services offered.
        </p>
        <p>
          By enrolling in our courses, booking a class, subscribing to our
          platform, or using any of our services, you (“Student”, “Parent”, or
          “User”) agree to this Policy.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. General Principles</h2>
        <p>
          SuperSheldon is committed to providing world-class learning
          experiences across global standards (UK, US, Australia) including
          NAPLAN, SAT, Selective Exams, 11+, GCSE, and academic/non-academic 1:1
          sessions.
        </p>
        <p>
          Since we reserve teacher time slots, learning resources, and platform
          access for every enrolled student, refunds and cancellations are
          subject to specific conditions outlined below.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          3. Cancellations by Students/Parents
        </h2>
        <h3 className="font-semibold">3.1 Single Class / Trial Sessions:</h3>
        <ul className="list-disc ml-6 mb-2">
          <li>
            If a cancellation request is made 24 hours prior to the scheduled
            class, the session can be rescheduled free of cost.
          </li>
          <li>
            If cancelled within 24 hours, the class will be considered consumed
            and non-refundable.
          </li>
        </ul>

        <h3 className="font-semibold">3.2 Course/Program Enrollments:</h3>
        <ul className="list-disc ml-6">
          <li>
            Cancellations made within 7 days of purchase and before the first
            class will be eligible for a 100% refund.
          </li>
          <li>
            Cancellations made after the first class but within 7 days of
            purchase will be eligible for a partial refund (course fee minus one
            class fee + administrative charges).
          </li>
          <li>
            No cancellations will be entertained after 7 days of purchase or
            once the student has attended more than 2 sessions.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Refund Conditions</h2>
        <h3 className="font-semibold">4.1 Eligible Refunds:</h3>
        <ul className="list-disc ml-6 mb-2">
          <li>
            A technical failure or platform issue prevents the student from
            attending despite valid attempts.
          </li>
          <li>
            A class is cancelled by SuperSheldon without providing an alternative
            or rescheduling option.
          </li>
          <li>Duplicate payment has been made due to technical errors.</li>
        </ul>

        <h3 className="font-semibold">4.2 Non-Refundable Cases:</h3>
        <ul className="list-disc ml-6">
          <li>Change of mind or lack of interest by student/parent.</li>
          <li>
            Non-attendance due to personal reasons (travel, other commitments).
          </li>
          <li>
            Failure to meet system requirements or internet connectivity issues
            on the student’s side.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Rescheduling Policy</h2>
        <ul className="list-disc ml-6">
          <li>
            Students may reschedule up to 2 classes per month with at least 24
            hours’ notice.
          </li>
          <li>Rescheduling is subject to teacher availability.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Course Transfers</h2>
        <ul className="list-disc ml-6">
          <li>
            A student may transfer their enrollment from one course/subject
            (e.g., Math to Science, Coding to Public Speaking) within 14 days of
            purchase, subject to availability.
          </li>
          <li>
            Course fee differences (if any) must be settled at the time of
            transfer.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          7. Refund Process & Timelines
        </h2>
        <ul className="list-disc ml-6">
          <li>
            All approved refunds will be processed within 7–14 working days via
            the original mode of payment.
          </li>
          <li>
            SuperSheldon is not responsible for delays caused by banks, payment
            gateways, or third-party providers.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          8. Company’s Right to Cancel
        </h2>
        <p>
          SuperSheldon reserves the right to cancel or reschedule any
          course/session in unforeseen circumstances (teacher unavailability,
          technical issues, or emergencies). In such cases, students will be
          offered an alternative session or a 100% refund.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">9. Grievance Redressal</h2>
        <p>
          Any concerns regarding cancellations or refunds must be raised to{" "}
          <a
            href="mailto:support@supersheldon.com"
            className="text-blue-600 underline"
          >
            support@supersheldon.com
          </a>{" "}
          within 7 days of the issue. The Company will review and respond within
          5 business days.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">10. Final Disclaimer</h2>
        <p>
          SuperSheldon strives to provide best-in-class academic and
          extracurricular learning. However, refunds cannot be claimed for
          outcomes such as exam scores, grades, or personal achievements, as
          learning success also depends on student effort and commitment.
        </p>
      </section>
    </div>
  );
}
