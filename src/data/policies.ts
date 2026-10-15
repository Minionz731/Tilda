// House rules and refund policy, transcribed from tildabelshaven.com.ng.
export const houseRules = {
  eyebrow: "Please read carefully",
  title: "House Rules",
  intro:
    "To ensure a safe, comfortable, and enjoyable stay for every guest, we ask that all visitors observe the following house rules during their time at Tilda Bel's Haven.",
  note: {
    title: "A Note to Our Guests",
    body: "By confirming a reservation at Tilda Bel's Haven Apartments, you agree to abide by the house rules below. These rules exist to protect the comfort, safety, and privacy of all our guests, and to ensure our property remains in excellent condition. Thank you for your cooperation.",
  },
  rules: [
    {
      title: "Check-in and Check-out",
      body: "Standard check-in time is 2:00 PM and check-out is 11:00 AM. Early check-in and late check-out are subject to availability and may incur additional charges.",
      points: ["Check-in: From 2:00 PM", "Check-out: By 11:00 AM", "Early check-in / late check-out: Available on request and may attract additional fees"],
    },
    {
      title: "Registered Guests",
      body: "Only guests included in the reservation are permitted to stay in the apartment. All visitors must report to the reception desk upon arrival for security and safety reasons.",
      points: ["Only registered guests may occupy the apartment overnight", "All visitors must sign in at the reception desk", "Visitors are allowed in common areas only, unless otherwise approved by management"],
    },
    {
      title: "No Parties or Events",
      body: "Parties, large gatherings, and events are strictly prohibited on the property. Violation of this rule will result in immediate termination of the reservation without refund and possible eviction.",
      points: ["Immediate reservation cancellation with no refund"],
    },
    {
      title: "Quiet Hours",
      body: "To ensure a peaceful environment for all guests, quiet hours are observed from 10:00 PM to 7:00 AM daily. Guests are kindly requested to keep noise to a minimum during these hours.",
      points: ["Quiet hours: 10:00 PM – 7:00 AM", "Please keep television and music volumes low", "Loud conversations in corridors and common areas are not permitted"],
    },
    {
      title: "No Smoking",
      body: "Smoking is strictly prohibited inside the apartments. Designated outdoor smoking areas are provided throughout the property. Failure to comply will result in professional cleaning charges.",
      points: ["Smoking is not allowed inside any apartment", "Use only the designated outdoor smoking areas", "Improper disposal of cigarettes is subject to a cleaning fee", "Professional cleaning charges apply for violations"],
    },
    {
      title: "Care of the Apartment",
      body: "Guests are expected to treat the apartment, furniture, fittings, and equipment with care. Any damage should be reported to management immediately. Please do not flush sanitary pads, wipes, or other non-biodegradable items down the toilet.",
      points: ["Report any damage or malfunction as soon as possible", "Furniture and fittings must not be moved or removed", "Do not flush pads, wipes, cotton buds, or similar items in the toilet"],
    },
    {
      title: "Energy Conservation",
      body: "In line with our commitment to sustainability, guests are kindly requested to turn off all lights, air conditioning units, and electrical appliances when leaving the apartment.",
      points: ["Switch off lights when leaving a room", "Turn off the air conditioning when the apartment is unoccupied", "Unplug non-essential appliances when not in use"],
    },
    {
      title: "Safety and Security",
      body: "For your safety, please ensure that all doors and windows are securely locked whenever you leave the apartment. Tilda Bel's Haven is not liable for the loss of personal belongings left unattended in the apartment or common areas.",
      points: ["Lock the front door and windows when leaving", "Do not leave valuables unattended", "Management is not responsible for lost or stolen items", "Liability disclaimer applies to personal belongings"],
    },
    {
      title: "Housekeeping",
      body: "Cleaning is not performed on a daily basis — we respect your privacy and your personal space. However, if you would like your apartment serviced during your stay, simply let us know and we will schedule it at a time that is convenient for you.",
      points: ["Scheduled cleaning is available on request", "Please dispose of waste in the bins provided between cleans", "Leave the apartment reasonably tidy for our housekeeping team when a clean is scheduled"],
    },
    {
      title: "Prohibited Activities",
      body: "Engaging in any illegal activity on the property is strictly prohibited. This includes the use, possession, or distribution of illegal substances, and any form of criminal behaviour. Violators will be handed over to law enforcement.",
      points: ["Zero tolerance for illegal activity"],
    },
    {
      title: "Respect for Property",
      body: "Guests are expected to treat the apartment, common areas, staff, and other guests with respect at all times. Nuisance, harassment, or any form of disruptive behaviour will not be tolerated and may result in eviction.",
      points: [],
    },
    {
      title: "Lost Keys",
      body: "Lost or damaged apartment keys will incur a replacement fee, which will be communicated and charged to the guest. Please report any lost keys to the front desk immediately.",
      points: ["Replacement fee applies for lost keys"],
    },
    {
      title: "Emergency Contact",
      body: "In the event of an emergency, please contact our 24-hour front desk or use the emergency number below. For life-threatening situations, dial the local emergency services first.",
      points: ["24-hour Front Desk: +234 903 483 5431", "Police: 112", "Fire Service: 112", "Ambulance: 112"],
    },
  ],
  help: {
    eyebrow: "Questions about our rules?",
    title: "We're Here to Help",
    body: "If you have any questions about our house rules or need clarification on any policy, our team is available 24/7 to assist you.",
  },
};

export const refundPolicy = {
  eyebrow: "Policies",
  title: "Cancellation & Refund Policy",
  intro: "Please read this policy carefully before making a booking.",
  sections: [
    { title: "Booking and Payment", points: ["A booking is confirmed only after payment has been received."] },
    {
      title: "Cancellation Policy",
      points: [
        "Cancellation 7 days or more before check-in: 80% refund.",
        "Cancellation 3–6 days before check-in: 50% refund.",
        "Cancellation within 72 hours of check-in: No refund.",
        "Same-day cancellations and no-shows: No refund.",
      ],
    },
    {
      title: "Early Departure",
      points: [
        "Guests who check out before their scheduled departure date will not receive a refund for unused nights.",
        "In cases of serious illness or other unforeseen circumstances, management may review refund requests on a case-by-case basis.",
      ],
    },
    { title: "Refund Processing", points: ["Approved refunds will be processed within 7–14 business days using the original payment method."] },
    { title: "Management Rights", points: ["Tilda Bel's Haven Apartments reserves the right to modify this policy."] },
  ],
  outro: "Questions? Contact us and we'll be happy to help.",
};
