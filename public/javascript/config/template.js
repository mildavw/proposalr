config.template = [];

var text = '<img src="/images/EJP Events Logo.png"/>';
config.template.push({title:'top_image', attributes:{hide_title:true}, text:text});

config.template.push({title:'contract_date', style:'text-align:right', attributes:{hide_title:true}, text:'«contract_date»'});

text = "«bride_first» «bride_last»\n";
text += "and «groom_first» «groom_last»\n";
text += "«address»\n";
text += "«city» «state», «zip»\n";
text += "«phone»\n";
text += "«email»";
config.template.push({title:'address', text:text, attributes:{hide_title:true}});

text = "EJP Events is pleased to submit a planning proposal\n";
text += "for the wedding of\n";
text += "«bride_first» «bride_last»\n";
text += "to\n";
text += "«groom_first» «groom_last»\n";
text += "on/in «wedding_date»\n";
text += "at «wedding_loc»";
config.template.push({title:'abstract', text:text, style:'text-align:center', attributes:{hide_title:true}});

config.template.push({title:'Wedding Design and Coordination', text:"Hold initial design meeting with «bride_first», «groom_first», and any other invited parties. Generate ideas and explore preferences for event atmosphere, colors and textures, formality level, paper and printing, menu and catering, sounds and visuals, floral and décor, ceremony and reception layout, and wedding attire. Research and provide documents, photos, and renderings from EJP Events design library. Total of (6#spellout) in-office consultation meetings, scheduled at client’s convenience, to solidify wedding design plans as well as administer other services described in this planning proposal."});

config.template.push({title:'Site Selection', text:"Identify three to five initial possible sites based on «bride_first» and «groom_first»’s criteria and suitability for implementation of wedding design. Research availability on target dates. Analyze key amenities and policies to create a site selection matrix from which to narrow down possibilities. Once facilities are chosen, create projected budget analysis, set appointments, and secure tentative holds (if permitted). Attend site inspections with client. Once final site selection is pending, review contracts and ensure all terms are in client’s best interests. Negotiate any outstanding issues until all parties reach agreement. Assist client in executing contract and delivering deposits if necessary."});

config.template.push({title:'Vendor Selection and Budget Management', text:"Source and suggest all vendors such as: «vendor_suggestions». Narrow vendor recommendations to those within the design criteria and budget parameters. Schedule and attend initial vendor appointments as needed. Suggest avenues and methods that will save money and add value. Assist client in executing contracts and delivering deposits if necessary."});

config.template.push({title:'Vendor Maintenance and Production Management', text:"Act as liaison to vendors and contractors. Communicate design expectations. «design_elements» Communicate planning and payment deadlines. Communicate directions, load-in schedule, setup requirements, and load-out procedure. «avenues» Schedule and attend follow-up vendor appointments as needed. Write Event Plan, including:  wedding day contact sheet, timeline, and setup narrative, for approval by «bride_first» and «groom_first». Once approved, distribute to all vendors and requested parties. Conduct final vendor confirmations, with at least one final walkthrough and additional ones as necessary."});

config.template.push({title:'Wedding Rehearsal', text:"Attend and manage wedding rehearsal. Provide clear instructions on prelude time, wedding processional, order of service, and recessional. Assist bride and groom, wedding party, officiant, and any others involved in ceremony by explaining procedures and being available to answer questions and handle last-minute tasks."});

config.template.push({title:'The Wedding Day', text:"Provide Lead Coordinator and «num_assistants» Assistant(s). Install and arrange simple design elements such as guest book table, favors, place cards, etc (items provided by Client). Oversee vendors’ installation and delivery of all other design elements such as «will_oversee». Attend to bride and groom’s needs during the getting-ready period. Coordinate photography schedule. Direct the wedding ceremony. Move small items from ceremony to reception site. Ensure all vendors provide according to contract. Oversee the Event Plan and reception timeline."});

config.template.push({title:'Post-Wedding', text:"Distribute vendor payments and/or tip envelopes. Ensure that gifts and personal items are removed from wedding site and placed with designated party. Oversee last guest departure and closing of the site. Remove and return simple design elements and small rentals such as cake stands, small floral, and accessories. Arrange for tear down and return of large design elements or rentals such as «oversee»."});

text = "All travel is included within a 1 hour radius of Portland. Additional mileage will be billed at the current IRS rate. If drivetime to your event exceeds 1.5 hours one-way, overnight lodging is required, and you agree to provide or reimburse lodging for all EJP Events staff adjacent to the wedding site for each night preceding a staff work day, as well as the night of the event. Our role will be that of advisor, and we will present you with options for the above tasks and services. You will make the actual selections, sign contracts with, and pay your service providers, then we will implement and coordinate your selection. Please inform your vendors that you are working with EJP Events.";
text += "\n";
text += "For our work, we will charge a flat fee of $«flat_fee», as follows:<ul>";
text += "<li>$«payment_amount» upon signature of this letter;</li>";
text += "<li>$«payment_amount» each due on «payment_date_2», «payment_date_3», and «payment_date_4».</li>";
text += "</ul>";
text += "Work on this project shall not begin until both a signed copy of this contract and first payment are received. If any of the payments are not received within three calendar days of the due date, we reserve the right to cease work on your wedding.";
text += "\n";
text += "This proposal is based on consultation and coordination for a wedding of approximately «num_people» people, involving «num_locations» location(s). Should the aforementioned numbers or tasks increase, affecting the staff necessary for your event, additional fees shall apply at the overtime rate of $75/hour. Labor (e.g., setup/teardown/janitorial), production, and raw materials are not included in the stated fees. A 5% processing fee may be added to vendor payments or materials reimbursements paid with a credit card, to cover transaction fees incurred by EJP Events.";
config.template.push({title:'Fees, Billing, and Travel', text:text});

text = "Either one of us may dissolve this contract at will. In this event, written notice will be given 15 days in advance of the effective Cancellation Date. If you cancel, you will not receive a refund of the fees already paid, but will not be responsible for any remaining portion of the fee. After you have signed and returned this agreement, a  change of wedding date or wedding postponement will be considered to be a cancellation, and a new contract and deposit would be required to engage our services for a new date. In the unlikely event that we cancel, you will receive a 100% refund of any fees you have paid. In the unlikely event that your scheduled coordinator is unable to perform due to severe illness, we reserve the right to substitute another coordinator to perform the same tasks at no reduction of fee.\n\n";
text += "Although we work with and will recommend thoroughly competent professionals for various aspects of your wedding, we will not be held liable for any errors, acts or omissions on their part. In addition, while EJP Events will make every effort to assist in and mitigate emergencies due to forgotten items, you will not hold us responsible for the procurement of wedding items which are traditionally purchased by the Client.\n\n";
text += "EJP Events’ staff abides by all Federal, State, and county/local laws and ordinances, including alcohol control laws. EJP Events reserves the right to suspend or terminate services without refund, and depart your event, if we determine your event is in violation of any law or ordinance, or if our staff are physically harassed, threatened, or placed in any hazardous situation at your event.\n\n";
text += "If an act of God, such as a fire, flood, earthquake or other natural calamity shall cause you to cancel your wedding, the above cancellation policy will apply. Likewise, if such an act of God, work stoppage, or airline/airport condition causes us or one of our recommended suppliers to be unable to provide the agreed-to service, you will not be required by us to pay for the service, but will not hold u s liable. You agree that EJP Events’ liability is limited to the amount of the fee paid for services rendered. You, the client, and not EJP Events, are liable for breakage, damage, or loss related to your event.\n\n";
text += "By signing this form, Client hereby grants to EJP Events and its legal representatives and assigns, the irrevocable and unrestricted right to use and publish social media updates (including photographs and video) related to, and of, this event for editorial, trade, advertising, art, and any other purpose and in any manner and medium; to alter the same without restriction; and to use Client’s name in connection therewith. Client hereby releases EJP Events and its legal representatives and assigns from all claims and liability relating to said photographs and social media updates.\n\n";
text += "The parties agree that the venue for any dispute arising under or in relation to this contract shall lie only in the City of Portland, Multnomah County, State of Oregon. In the event of such a dispute, the non-prevailing party shall be responsible for any judgment awarded plus the reimbursement of all reasonable attorney’s fees of the prevailing party.\n\n";
text += "This contract constitutes an offer of services and may not be changed, annotated, or lined out without our mutual agreement. These services are sold as a package and Client’s decision to make partial use of package shall not constitute partial payment. Any changes must be submitted in writing as a separate contract and signed by all parties.  This offer is good until «option_date» or until a first option has been declined; if not confirmed by a payment, the offer may be revoked at EJP Events’ discretion.";
config.template.push({title:'fine_print', text:text, style:'font-size:0.7em', attributes: {hide_title:true}});

text = "«salutation», if you understand and agree to these arrangements, please sign one copy of this letter and return it to me along with your check for $«payment_amount». Payment may also be handled by credit card, in which case, please sign one copy of this letter and check the box indicating that you wish to receive a credit card authorization form.\n\n";
text += "I wish you all the happiness in the world, and look forward to working with you to make your wedding a joyful and stress-free occasion.\n\n";
text += "Accepted and agreed to by:\n\n\n";
text += "<div style='float:left'>_____________________________________\n«bride_first» «bride_last»\nor «groom_first» «groom_last»";
text += "\n\n\n\n_____________________________________<br/>Date</div>";
text += "<div style='float:right'>_____________________________________\nEmee Pumarega, CMP<br/>Owner, EJP Events";
text += "\n\n\n\n_____________________________________<br/>Date</div>";
config.template.push({title:'salutation', text:text, attributes: {hide_title:true}});