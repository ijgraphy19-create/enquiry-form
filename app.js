// Photography Inquiry Form Application
class PhotographyInquiryForm {
    constructor() {
        this.currentStep = 0;
        this.selectedEvent = null;
        this.formData = {};
        this.eventTimelineItems = [];
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateProgress();
    }

    bindEvents() {
        // Event type selection
        document.querySelectorAll('.event-card').forEach(card => {
            card.addEventListener('click', (e) => this.selectEventType(e));
        });

        // Form navigation
        document.getElementById('nextBtn').addEventListener('click', () => this.nextStep());
        document.getElementById('prevBtn').addEventListener('click', () => this.prevStep());
        document.getElementById('submitBtn').addEventListener('click', (e) => this.submitForm(e));

        // Form submission
        document.getElementById('inquiryForm').addEventListener('submit', (e) => this.submitForm(e));

        // Dynamic timeline management - use event delegation
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-timeline-btn')) {
                e.preventDefault();
                this.addTimelineItem();
            }
            if (e.target.classList.contains('remove-timeline-btn')) {
                e.preventDefault();
                this.removeTimelineItem(e.target.closest('.timeline-item'));
            }
        });

        // Brand logo click to go back to welcome
        document.querySelector('.brand').addEventListener('click', () => {
            this.resetForm();
        });
    }

    resetForm() {
        // Reset all form data
        this.currentStep = 0;
        this.selectedEvent = null;
        this.formData = {};
        this.eventTimelineItems = [];

        // Hide all sections except welcome
        document.getElementById('formSection').classList.remove('active');
        document.getElementById('formSection').classList.add('hidden');
        document.getElementById('confirmationSection').classList.remove('active');
        document.getElementById('confirmationSection').classList.add('hidden');
        document.getElementById('progressContainer').classList.add('hidden');

        // Show welcome section
        document.getElementById('welcomeSection').classList.remove('hidden');
        document.getElementById('welcomeSection').classList.add('active');

        // Clear event selection
        document.querySelectorAll('.event-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Reset form steps
        document.querySelectorAll('.form-step').forEach(step => {
            step.classList.remove('active');
            step.classList.add('hidden');
        });
        document.getElementById('eventDetailsStep').classList.remove('hidden');
        document.getElementById('eventDetailsStep').classList.add('active');

        // Reset navigation buttons
        document.getElementById('prevBtn').classList.add('hidden');
        document.getElementById('nextBtn').classList.remove('hidden');
        document.getElementById('submitBtn').classList.add('hidden');

        // Clear form
        document.getElementById('inquiryForm').reset();
    }

    selectEventType(e) {
        const eventType = e.currentTarget.dataset.event;
        this.selectedEvent = eventType;
        
        // Visual feedback
        document.querySelectorAll('.event-card').forEach(card => {
            card.classList.remove('selected');
        });
        e.currentTarget.classList.add('selected');
        
        // Generate dynamic form content
        setTimeout(() => {
            this.generateEventForm(eventType);
            this.showFormSection();
            this.showProgress();
        }, 300);
    }

    generateEventForm(eventType) {
        const dynamicContent = document.getElementById('dynamicFormContent');
        const formTemplates = this.getFormTemplates();
        
        if (formTemplates[eventType]) {
            dynamicContent.innerHTML = formTemplates[eventType];
            this.bindDynamicEvents();
        }
    }

    getFormTemplates() {
        return {
            'Wedding': this.getWeddingFormTemplate(),
            'Engagement': this.getEngagementFormTemplate(),
            'Birthday Party': this.getBirthdayFormTemplate(),
            'Naming Ceremony': this.getNamingCeremonyFormTemplate(),
            'Baby Shower': this.getBabyShowerFormTemplate(),
            'Corporate Event': this.getCorporateEventFormTemplate(),
            'Concert': this.getConcertFormTemplate(),
            'House Warming': this.getHouseWarmingFormTemplate(),
            'Anniversary': this.getAnniversaryFormTemplate(),
            'Graduation': this.getGraduationFormTemplate(),
            'Family Portrait': this.getFamilyPortraitFormTemplate()
        };
    }

    getWeddingFormTemplate() {
        return `
            <div class="form-section">
                <h3>Tell Us About Your Love Story</h3>
                <p class="field-description">Every love story is unique and beautiful - help us understand yours so we can capture it perfectly</p>
                
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label" for="brideName">Bride's Name *</label>
                        <input type="text" id="brideName" name="brideName" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="groomName">Groom's Name *</label>
                        <input type="text" id="groomName" name="groomName" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="weddingDate">Wedding Date *</label>
                        <p class="field-description">The magical day when you say "I do"</p>
                        <input type="date" id="weddingDate" name="weddingDate" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="weddingVenue">Wedding Venue *</label>
                        <p class="field-description">Where will your beautiful journey begin?</p>
                        <input type="text" id="weddingVenue" name="weddingVenue" class="form-control" placeholder="Venue name and location" required>
                    </div>
                </div>
            </div>

            <div class="form-section">
                <h3>Your Wedding Timeline</h3>
                <p class="field-description">Help us understand your wedding events so we can capture every precious moment</p>
                
                <div class="event-timeline" id="weddingTimeline">
                    <div class="timeline-item">
                        <div class="form-group">
                            <label class="form-label">Event Name</label>
                            <input type="text" name="eventName_1" class="form-control" placeholder="e.g., Ceremony, Reception, Cocktail Hour" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Guest Count</label>
                            <input type="number" name="guestCount_1" class="form-control" placeholder="150" min="1">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Duration (hrs)</label>
                            <input type="number" name="duration_1" class="form-control" placeholder="3" min="1" step="0.5">
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn--outline add-timeline-btn">Add Another Event</button>
            </div>

            <div class="form-section">
                <h3>Your Love Story</h3>
                <div class="form-group mb-large">
                    <label class="form-label" for="loveStory">How did you meet? *</label>
                    <p class="field-description">Share the beautiful beginning of your love story - we love hearing how couples found each other</p>
                    <textarea id="loveStory" name="loveStory" class="form-control" rows="4" placeholder="Tell us about the moment you first met, your first date, or what drew you to each other..." required></textarea>
                </div>
                
                <div class="form-group mb-large">
                    <label class="form-label" for="photographyVision">Your Photography Vision</label>
                    <p class="field-description">What style and mood do you envision for your wedding photos?</p>
                    <textarea id="photographyVision" name="photographyVision" class="form-control" rows="3" placeholder="Romantic and dreamy, modern and elegant, rustic and natural, bold and dramatic..."></textarea>
                </div>

                <div class="form-group mb-large">
                    <label class="form-label" for="specialMoments">Must-Have Shots</label>
                    <p class="field-description">Are there specific moments, people, or details that are especially important to you?</p>
                    <textarea id="specialMoments" name="specialMoments" class="form-control" rows="3" placeholder="First look, grandparents' reactions, wedding dress details, family heirlooms, cultural traditions..."></textarea>
                </div>

                <div class="form-group">
                    <label class="form-label" for="specialRequests">Special Considerations</label>
                    <p class="field-description">Venue restrictions, family dynamics, or anything else we should know to make your day perfect</p>
                    <textarea id="specialRequests" name="specialRequests" class="form-control" rows="3" placeholder="No flash during ceremony, divorced parents arrangements, surprise elements, accessibility needs..."></textarea>
                </div>
            </div>
        `;
    }

    getEngagementFormTemplate() {
        return `
            <div class="form-section">
                <h3>Celebrate Your Engagement</h3>
                <p class="field-description">Let's capture the joy and excitement of this special time in your lives</p>
                
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label" for="partner1Name">Partner 1 Name *</label>
                        <input type="text" id="partner1Name" name="partner1Name" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="partner2Name">Partner 2 Name *</label>
                        <input type="text" id="partner2Name" name="partner2Name" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="engagementDate">Preferred Shoot Date *</label>
                        <input type="date" id="engagementDate" name="engagementDate" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="shootLocation">Preferred Location</label>
                        <p class="field-description">Where would you like your engagement session?</p>
                        <input type="text" id="shootLocation" name="shootLocation" class="form-control" placeholder="Beach, park, urban setting, meaningful location...">
                    </div>
                </div>
                
                <div class="form-group mb-large">
                    <label class="form-label" for="proposalStory">Your Proposal Story</label>
                    <p class="field-description">We'd love to hear about your proposal! (If you'd like to share)</p>
                    <textarea id="proposalStory" name="proposalStory" class="form-control" rows="4" placeholder="Tell us about how the proposal happened - the story behind this beautiful moment..."></textarea>
                </div>
                
                <div class="form-group mb-large">
                    <label class="form-label" for="shootStyle">Photography Style Preference</label>
                    <p class="field-description">What vibe are you going for in your engagement photos?</p>
                    <textarea id="shootStyle" name="shootStyle" class="form-control" rows="3" placeholder="Romantic and soft, fun and playful, elegant and classic, adventurous and outdoorsy..."></textarea>
                </div>
            </div>
        `;
    }

    getBirthdayFormTemplate() {
        return `
            <div class="form-section">
                <h3>Birthday Celebration Details</h3>
                <p class="field-description">Every milestone deserves to be celebrated and remembered beautifully</p>
                
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label" for="celebrantName">Birthday Celebrant's Name *</label>
                        <input type="text" id="celebrantName" name="celebrantName" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="celebrantAge">Age They're Turning *</label>
                        <input type="number" id="celebrantAge" name="celebrantAge" class="form-control" min="1" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="partyDate">Party Date *</label>
                        <input type="date" id="partyDate" name="partyDate" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="partyVenue">Party Venue *</label>
                        <input type="text" id="partyVenue" name="partyVenue" class="form-control" placeholder="Home, restaurant, party hall..." required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="guestCount">Expected Guest Count</label>
                        <input type="number" id="guestCount" name="guestCount" class="form-control" placeholder="50" min="1">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="partyDuration">Party Duration (hours)</label>
                        <input type="number" id="partyDuration" name="partyDuration" class="form-control" placeholder="4" min="1" step="0.5">
                    </div>
                </div>
                
                <div class="form-group mb-large">
                    <label class="form-label" for="partyTheme">Party Theme & Style</label>
                    <p class="field-description">Tell us about the theme, colors, or style of the celebration</p>
                    <textarea id="partyTheme" name="partyTheme" class="form-control" rows="3" placeholder="Princess theme, superhero party, elegant dinner, casual backyard BBQ..."></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="specialMoments">Special Moments to Capture</label>
                    <p class="field-description">What are the most important moments you want us to focus on?</p>
                    <textarea id="specialMoments" name="specialMoments" class="form-control" rows="3" placeholder="Cake cutting, gift opening, surprise moments, family group photos, candid laughter..."></textarea>
                </div>
            </div>
        `;
    }

    getNamingCeremonyFormTemplate() {
        return `
            <div class="form-section">
                <h3>Welcoming Your Little One</h3>
                <p class="field-description">This precious milestone deserves to be captured with love and care</p>
                
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label" for="babyName">Baby's Name *</label>
                        <input type="text" id="babyName" name="babyName" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="babyAge">Baby's Age</label>
                        <p class="field-description">How old will your little one be?</p>
                        <input type="text" id="babyAge" name="babyAge" class="form-control" placeholder="3 months, 6 weeks...">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="ceremonyDate">Ceremony Date *</label>
                        <input type="date" id="ceremonyDate" name="ceremonyDate" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="ceremonyVenue">Ceremony Venue *</label>
                        <input type="text" id="ceremonyVenue" name="ceremonyVenue" class="form-control" placeholder="Temple, home, community hall..." required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="guestCount">Expected Guest Count</label>
                        <input type="number" id="guestCount" name="guestCount" class="form-control" placeholder="30" min="1">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="ceremonyDuration">Ceremony Duration (hours)</label>
                        <input type="number" id="ceremonyDuration" name="ceremonyDuration" class="form-control" placeholder="2" min="1" step="0.5">
                    </div>
                </div>
                
                <div class="form-group mb-large">
                    <label class="form-label" for="culturalSignificance">Cultural or Religious Significance</label>
                    <p class="field-description">Help us understand the traditions and meaning behind this beautiful ceremony</p>
                    <textarea id="culturalSignificance" name="culturalSignificance" class="form-control" rows="4" placeholder="Religious traditions, cultural customs, family rituals, symbolic elements..."></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="familyTraditions">Special Family Moments</label>
                    <p class="field-description">Are there specific family traditions or moments that are especially important?</p>
                    <textarea id="familyTraditions" name="familyTraditions" class="form-control" rows="3" placeholder="Grandparents' blessings, family prayers, traditional outfits, special ceremonies..."></textarea>
                </div>
            </div>
        `;
    }

    getBabyShowerFormTemplate() {
        return `
            <div class="form-section">
                <h3>Celebrating New Life</h3>
                <p class="field-description">Capturing the joy and anticipation of welcoming your precious little one</p>
                
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label" for="expectingParent">Expecting Parent's Name *</label>
                        <input type="text" id="expectingParent" name="expectingParent" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="babyGender">Baby's Gender (if known)</label>
                        <select id="babyGender" name="babyGender" class="form-control">
                            <option value="">Prefer not to say</option>
                            <option value="boy">Boy</option>
                            <option value="girl">Girl</option>
                            <option value="surprise">It's a surprise!</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="showerDate">Baby Shower Date *</label>
                        <input type="date" id="showerDate" name="showerDate" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="showerVenue">Shower Venue *</label>
                        <input type="text" id="showerVenue" name="showerVenue" class="form-control" placeholder="Home, restaurant, event space..." required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="guestCount">Expected Guest Count</label>
                        <input type="number" id="guestCount" name="guestCount" class="form-control" placeholder="25" min="1">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="showerDuration">Shower Duration (hours)</label>
                        <input type="number" id="showerDuration" name="showerDuration" class="form-control" placeholder="3" min="1" step="0.5">
                    </div>
                </div>
                
                <div class="form-group mb-large">
                    <label class="form-label" for="showerTheme">Shower Theme & Decorations</label>
                    <p class="field-description">What's the style and theme of your baby shower?</p>
                    <textarea id="showerTheme" name="showerTheme" class="form-control" rows="3" placeholder="Garden party, safari theme, pastel elegance, rustic chic, floral fantasy..."></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="specialActivities">Special Activities & Games</label>
                    <p class="field-description">What special moments and activities should we focus on capturing?</p>
                    <textarea id="specialActivities" name="specialActivities" class="form-control" rows="3" placeholder="Gift opening, baby games, cake cutting, mom-to-be's reactions, group photos..."></textarea>
                </div>
            </div>
        `;
    }

    getCorporateEventFormTemplate() {
        return `
            <div class="form-section">
                <h3>Corporate Event Details</h3>
                <p class="field-description">Professional photography that showcases your company and captures important business moments</p>
                
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label" for="companyName">Company Name *</label>
                        <input type="text" id="companyName" name="companyName" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="eventType">Type of Event *</label>
                        <select id="eventType" name="eventType" class="form-control" required>
                            <option value="">Select event type</option>
                            <option value="conference">Conference</option>
                            <option value="seminar">Seminar/Workshop</option>
                            <option value="product-launch">Product Launch</option>
                            <option value="team-building">Team Building</option>
                            <option value="awards">Awards Ceremony</option>
                            <option value="networking">Networking Event</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="eventDate">Event Date *</label>
                        <input type="date" id="eventDate" name="eventDate" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="eventVenue">Event Venue *</label>
                        <input type="text" id="eventVenue" name="eventVenue" class="form-control" placeholder="Hotel, convention center, office..." required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="attendeeCount">Expected Attendee Count</label>
                        <input type="number" id="attendeeCount" name="attendeeCount" class="form-control" placeholder="100" min="1">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="eventDuration">Event Duration (hours)</label>
                        <input type="number" id="eventDuration" name="eventDuration" class="form-control" placeholder="6" min="1" step="0.5">
                    </div>
                </div>
                
                <div class="form-group mb-large">
                    <label class="form-label" for="keyMoments">Key Moments & People</label>
                    <p class="field-description">What are the most important moments, presentations, or people we should focus on?</p>
                    <textarea id="keyMoments" name="keyMoments" class="form-control" rows="4" placeholder="Keynote speakers, award presentations, product demonstrations, CEO speech, networking sessions..."></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="brandGuidelines">Brand Guidelines & Usage</label>
                    <p class="field-description">Any specific brand requirements or how will these photos be used?</p>
                    <textarea id="brandGuidelines" name="brandGuidelines" class="form-control" rows="3" placeholder="Website, social media, annual report, press releases, marketing materials..."></textarea>
                </div>
            </div>
        `;
    }

    getConcertFormTemplate() {
        return `
            <div class="form-section">
                <h3>Concert/Music Event Details</h3>
                <p class="field-description">Dynamic photography that captures the energy, emotion, and magic of live music</p>
                
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label" for="artistName">Artist/Band Name *</label>
                        <input type="text" id="artistName" name="artistName" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="musicGenre">Music Genre</label>
                        <input type="text" id="musicGenre" name="musicGenre" class="form-control" placeholder="Rock, Pop, Classical, Jazz...">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="concertDate">Concert Date *</label>
                        <input type="date" id="concertDate" name="concertDate" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="venue">Venue *</label>
                        <input type="text" id="venue" name="venue" class="form-control" placeholder="Concert hall, club, outdoor venue..." required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="audienceSize">Expected Audience Size</label>
                        <input type="number" id="audienceSize" name="audienceSize" class="form-control" placeholder="500" min="1">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="performanceDuration">Performance Duration (hours)</label>
                        <input type="number" id="performanceDuration" name="performanceDuration" class="form-control" placeholder="3" min="1" step="0.5">
                    </div>
                </div>
                
                <div class="form-group mb-large">
                    <label class="form-label" for="performanceStyle">Performance Style & Atmosphere</label>
                    <p class="field-description">Describe the energy and style of the performance</p>
                    <textarea id="performanceStyle" name="performanceStyle" class="form-control" rows="3" placeholder="High-energy rock show, intimate acoustic set, classical elegance, dance party atmosphere..."></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="keyShots">Key Shots Needed</label>
                    <p class="field-description">What specific moments or angles are most important for your event?</p>
                    <textarea id="keyShots" name="keyShots" class="form-control" rows="3" placeholder="Stage action, crowd reactions, backstage moments, band interactions, lighting effects..."></textarea>
                </div>
            </div>
        `;
    }

    getHouseWarmingFormTemplate() {
        return `
            <div class="form-section">
                <h3>House Warming Celebration</h3>
                <p class="field-description">Celebrating your beautiful new home and the memories you'll create there</p>
                
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label" for="homeownerNames">Homeowner Name(s) *</label>
                        <input type="text" id="homeownerNames" name="homeownerNames" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="houseWarmingDate">House Warming Date *</label>
                        <input type="date" id="houseWarmingDate" name="houseWarmingDate" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="homeLocation">Home Location *</label>
                        <input type="text" id="homeLocation" name="homeLocation" class="form-control" placeholder="City, neighborhood" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="guestCount">Expected Guest Count</label>
                        <input type="number" id="guestCount" name="guestCount" class="form-control" placeholder="40" min="1">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="partyDuration">Celebration Duration (hours)</label>
                        <input type="number" id="partyDuration" name="partyDuration" class="form-control" placeholder="4" min="1" step="0.5">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="homeStyle">Home Style</label>
                        <p class="field-description">What's the style of your beautiful new home?</p>
                        <input type="text" id="homeStyle" name="homeStyle" class="form-control" placeholder="Modern, traditional, farmhouse, contemporary...">
                    </div>
                </div>
                
                <div class="form-group mb-large">
                    <label class="form-label" for="homeFeatures">Special Features to Highlight</label>
                    <p class="field-description">What are you most excited to show off about your new home?</p>
                    <textarea id="homeFeatures" name="homeFeatures" class="form-control" rows="3" placeholder="Beautiful kitchen, cozy fireplace, garden, home office, kids' rooms, outdoor spaces..."></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="celebrationStyle">Celebration Activities</label>
                    <p class="field-description">What kind of activities and moments should we capture?</p>
                    <textarea id="celebrationStyle" name="celebrationStyle" class="form-control" rows="3" placeholder="House tours, family gathering, blessing ceremony, outdoor barbecue, kids playing..."></textarea>
                </div>
            </div>
        `;
    }

    getAnniversaryFormTemplate() {
        return `
            <div class="form-section">
                <h3>Anniversary Celebration</h3>
                <p class="field-description">Celebrating your beautiful journey together and the love that continues to grow</p>
                
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label" for="coupleNames">Couple Names *</label>
                        <input type="text" id="coupleNames" name="coupleNames" class="form-control" placeholder="John & Jane Smith" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="anniversaryYear">Anniversary Year *</label>
                        <p class="field-description">How many beautiful years are you celebrating?</p>
                        <input type="number" id="anniversaryYear" name="anniversaryYear" class="form-control" placeholder="25" min="1" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="celebrationDate">Celebration Date *</label>
                        <input type="date" id="celebrationDate" name="celebrationDate" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="celebrationVenue">Celebration Venue *</label>
                        <input type="text" id="celebrationVenue" name="celebrationVenue" class="form-control" placeholder="Home, restaurant, banquet hall..." required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="guestCount">Expected Guest Count</label>
                        <input type="number" id="guestCount" name="guestCount" class="form-control" placeholder="60" min="1">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="celebrationDuration">Celebration Duration (hours)</label>
                        <input type="number" id="celebrationDuration" name="celebrationDuration" class="form-control" placeholder="4" min="1" step="0.5">
                    </div>
                </div>
                
                <div class="form-group mb-large">
                    <label class="form-label" for="loveJourney">Your Love Journey</label>
                    <p class="field-description">Share some highlights from your years together - what makes your love story special?</p>
                    <textarea id="loveJourney" name="loveJourney" class="form-control" rows="4" placeholder="Adventures you've shared, challenges you've overcome, dreams you've achieved together..."></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="specialMoments">Important Moments to Capture</label>
                    <p class="field-description">What special moments or traditions will be part of your celebration?</p>
                    <textarea id="specialMoments" name="specialMoments" class="form-control" rows="3" placeholder="Vow renewals, speeches from family, special dances, photo slideshows, family gathering..."></textarea>
                </div>
            </div>
        `;
    }

    getGraduationFormTemplate() {
        return `
            <div class="form-section">
                <h3>Graduation Celebration</h3>
                <p class="field-description">Capturing this incredible achievement and the proud moments with family and friends</p>
                
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label" for="graduateName">Graduate's Name *</label>
                        <input type="text" id="graduateName" name="graduateName" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="degreeLevel">Degree/Achievement Level *</label>
                        <select id="degreeLevel" name="degreeLevel" class="form-control" required>
                            <option value="">Select level</option>
                            <option value="high-school">High School</option>
                            <option value="associates">Associate's Degree</option>
                            <option value="bachelors">Bachelor's Degree</option>
                            <option value="masters">Master's Degree</option>
                            <option value="phd">PhD/Doctorate</option>
                            <option value="professional">Professional Certification</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="fieldOfStudy">Field of Study</label>
                        <input type="text" id="fieldOfStudy" name="fieldOfStudy" class="form-control" placeholder="Engineering, Medicine, Arts, Business...">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="graduationDate">Graduation Date *</label>
                        <input type="date" id="graduationDate" name="graduationDate" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="celebrationVenue">Celebration Venue *</label>
                        <input type="text" id="celebrationVenue" name="celebrationVenue" class="form-control" placeholder="University, home, restaurant..." required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="guestCount">Expected Guest Count</label>
                        <input type="number" id="guestCount" name="guestCount" class="form-control" placeholder="20" min="1">
                    </div>
                </div>
                
                <div class="form-group mb-large">
                    <label class="form-label" for="achievementStory">Your Achievement Journey</label>
                    <p class="field-description">What makes this graduation extra special? Share your journey and accomplishments</p>
                    <textarea id="achievementStory" name="achievementStory" class="form-control" rows="4" placeholder="Challenges overcome, favorite memories, future plans, what this achievement means to you..."></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="importantPeople">Important People & Moments</label>
                    <p class="field-description">Who are the special people celebrating with you, and what moments are most important?</p>
                    <textarea id="importantPeople" name="importantPeople" class="form-control" rows="3" placeholder="Proud parents, supportive family, mentors, friends, cap toss, diploma presentation..."></textarea>
                </div>
            </div>
        `;
    }

    getFamilyPortraitFormTemplate() {
        return `
            <div class="form-section">
                <h3>Family Portrait Session</h3>
                <p class="field-description">Creating timeless portraits that celebrate the love and connection of your beautiful family</p>
                
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label" for="familyName">Family Name *</label>
                        <input type="text" id="familyName" name="familyName" class="form-control" placeholder="The Smith Family" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="sessionDate">Preferred Session Date *</label>
                        <input type="date" id="sessionDate" name="sessionDate" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="familySize">Number of Family Members</label>
                        <input type="number" id="familySize" name="familySize" class="form-control" placeholder="4" min="1">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="childrenAges">Children's Ages</label>
                        <p class="field-description">If you have children, what are their ages?</p>
                        <input type="text" id="childrenAges" name="childrenAges" class="form-control" placeholder="5, 8, 12 years old">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="sessionLocation">Preferred Location</label>
                        <input type="text" id="sessionLocation" name="sessionLocation" class="form-control" placeholder="Park, beach, home, studio...">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="sessionDuration">Preferred Session Duration</label>
                        <select id="sessionDuration" name="sessionDuration" class="form-control">
                            <option value="1">1 hour</option>
                            <option value="1.5">1.5 hours</option>
                            <option value="2">2 hours</option>
                            <option value="custom">Custom timing</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group mb-large">
                    <label class="form-label" for="familyPersonality">Your Family's Personality</label>
                    <p class="field-description">Tell us about your family's style and personality so we can capture your authentic selves</p>
                    <textarea id="familyPersonality" name="familyPersonality" class="form-control" rows="4" placeholder="Playful and energetic, calm and loving, adventurous, formal and traditional, fun-loving..."></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="portraitStyle">Portrait Style Preference</label>
                    <p class="field-description">What style of family portraits appeal to you most?</p>
                    <textarea id="portraitStyle" name="portraitStyle" class="form-control" rows="3" placeholder="Classic and timeless, natural and candid, artistic and creative, lifestyle in your home..."></textarea>
                </div>
            </div>
        `;
    }

    bindDynamicEvents() {
        // Add event listeners for dynamic elements
        const rangeSliders = document.querySelectorAll('input[type="range"]');
        rangeSliders.forEach(slider => {
            const valueDisplay = slider.nextElementSibling;
            if (valueDisplay && valueDisplay.classList.contains('range-value')) {
                slider.addEventListener('input', (e) => {
                    valueDisplay.textContent = e.target.value;
                });
            }
        });
    }

    addTimelineItem() {
        const timeline = document.getElementById('weddingTimeline');
        if (!timeline) return;
        
        const itemCount = timeline.children.length;
        const newItem = document.createElement('div');
        newItem.className = 'timeline-item';
        newItem.innerHTML = `
            <div class="form-group">
                <label class="form-label">Event Name</label>
                <input type="text" name="eventName_${itemCount + 1}" class="form-control" placeholder="e.g., Pre-wedding, Sangeet" required>
            </div>
            <div class="form-group">
                <label class="form-label">Guest Count</label>
                <input type="number" name="guestCount_${itemCount + 1}" class="form-control" placeholder="100" min="1">
            </div>
            <div class="form-group">
                <label class="form-label">Duration (hrs)</label>
                <input type="number" name="duration_${itemCount + 1}" class="form-control" placeholder="2" min="1" step="0.5">
            </div>
            <div class="form-group">
                <button type="button" class="btn btn--outline remove-timeline-btn">Remove</button>
            </div>
        `;
        timeline.appendChild(newItem);
    }

    removeTimelineItem(item) {
        const timeline = document.getElementById('weddingTimeline');
        if (timeline && timeline.children.length > 1) {
            item.remove();
        }
    }

    showFormSection() {
        document.getElementById('welcomeSection').classList.remove('active');
        document.getElementById('welcomeSection').classList.add('hidden');
        document.getElementById('formSection').classList.remove('hidden');
        document.getElementById('formSection').classList.add('active');
    }

    showProgress() {
        document.getElementById('progressContainer').classList.remove('hidden');
        this.updateProgress();
    }

    updateProgress() {
        const steps = ['step1', 'step2', 'step3', 'step4'];
        const progressFill = document.getElementById('progressFill');
        
        // Update progress bar
        const progressWidth = ((this.currentStep + 1) / 4) * 100;
        progressFill.style.width = `${progressWidth}%`;
        
        // Update step indicators
        steps.forEach((stepId, index) => {
            const stepElement = document.getElementById(stepId);
            if (stepElement) {
                stepElement.classList.remove('active', 'completed');
                
                if (index < this.currentStep) {
                    stepElement.classList.add('completed');
                } else if (index === this.currentStep) {
                    stepElement.classList.add('active');
                }
            }
        });
    }

    nextStep() {
        if (this.validateCurrentStep()) {
            this.saveCurrentStepData();
            
            if (this.currentStep < 2) {
                this.showNextStep();
            }
        }
    }

    prevStep() {
        if (this.currentStep > 0) {
            this.showPrevStep();
        }
    }

    showNextStep() {
        const currentStepElement = document.querySelector('.form-step.active');
        if (currentStepElement) {
            currentStepElement.classList.remove('active');
            currentStepElement.classList.add('hidden');
        }
        
        this.currentStep++;
        
        const stepElements = document.querySelectorAll('.form-step');
        if (stepElements[this.currentStep]) {
            stepElements[this.currentStep].classList.remove('hidden');
            stepElements[this.currentStep].classList.add('active');
        }
        
        this.updateNavigation();
        this.updateProgress();
        
        // Scroll to top
        window.scrollTo(0, 0);
    }

    showPrevStep() {
        const currentStepElement = document.querySelector('.form-step.active');
        if (currentStepElement) {
            currentStepElement.classList.remove('active');
            currentStepElement.classList.add('hidden');
        }
        
        this.currentStep--;
        
        const stepElements = document.querySelectorAll('.form-step');
        if (stepElements[this.currentStep]) {
            stepElements[this.currentStep].classList.remove('hidden');
            stepElements[this.currentStep].classList.add('active');
        }
        
        this.updateNavigation();
        this.updateProgress();
        
        // Scroll to top
        window.scrollTo(0, 0);
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');
        
        // Show/hide previous button
        if (this.currentStep > 0) {
            prevBtn.classList.remove('hidden');
        } else {
            prevBtn.classList.add('hidden');
        }
        
        // Show/hide next/submit buttons
        if (this.currentStep === 2) {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            submitBtn.classList.add('hidden');
        }
    }

    validateCurrentStep() {
        const currentStepElement = document.querySelector('.form-step.active');
        if (!currentStepElement) return true;
        
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            field.classList.remove('error'); // Clear previous errors
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            }
        });
        
        if (!isValid) {
            this.showError('Please fill in all required fields before continuing.');
        }
        
        return isValid;
    }

    saveCurrentStepData() {
        const currentStepElement = document.querySelector('.form-step.active');
        if (!currentStepElement) return;
        
        const formElements = currentStepElement.querySelectorAll('input, select, textarea');
        
        formElements.forEach(element => {
            if (element.type === 'checkbox') {
                if (!this.formData.services) this.formData.services = [];
                if (element.checked && !this.formData.services.includes(element.value)) {
                    this.formData.services.push(element.value);
                } else if (!element.checked) {
                    const index = this.formData.services.indexOf(element.value);
                    if (index > -1) this.formData.services.splice(index, 1);
                }
            } else {
                this.formData[element.name] = element.value;
            }
        });
    }

    submitForm(e) {
        e.preventDefault();
        
        if (this.validateCurrentStep()) {
            this.saveCurrentStepData();
            this.showConfirmation();
        }
    }

    showConfirmation() {
        // Hide form section
        document.getElementById('formSection').classList.remove('active');
        document.getElementById('formSection').classList.add('hidden');
        document.getElementById('progressContainer').classList.add('hidden');
        
        // Show confirmation
        document.getElementById('confirmationSection').classList.remove('hidden');
        document.getElementById('confirmationSection').classList.add('active');
        
        // Generate summary
        this.generateInquirySummary();
        
        // Scroll to top
        window.scrollTo(0, 0);
    }

    generateInquirySummary() {
        const summaryContainer = document.getElementById('inquirySummary');
        let summaryHTML = '<h3>Your Inquiry Summary</h3>';
        
        // Event type
        summaryHTML += `
            <div class="summary-section">
                <h4>Event Type</h4>
                <p><strong>${this.selectedEvent}</strong></p>
            </div>
        `;
        
        // Event details based on type
        if (this.selectedEvent === 'Wedding') {
            if (this.formData.brideName && this.formData.groomName) {
                summaryHTML += `
                    <div class="summary-section">
                        <h4>Couple</h4>
                        <p><strong>${this.formData.brideName} & ${this.formData.groomName}</strong></p>
                        ${this.formData.weddingDate ? `<p>Wedding Date: <strong>${this.formData.weddingDate}</strong></p>` : ''}
                        ${this.formData.weddingVenue ? `<p>Venue: <strong>${this.formData.weddingVenue}</strong></p>` : ''}
                    </div>
                `;
            }
        } else {
            // Generic event details
            const eventFields = ['eventDate', 'celebrationDate', 'partyDate', 'sessionDate', 'concertDate'];
            const venueFields = ['venue', 'eventVenue', 'celebrationVenue', 'partyVenue'];
            
            let eventDate = '';
            let eventVenue = '';
            
            eventFields.forEach(field => {
                if (this.formData[field]) eventDate = this.formData[field];
            });
            
            venueFields.forEach(field => {
                if (this.formData[field]) eventVenue = this.formData[field];
            });
            
            if (eventDate || eventVenue) {
                summaryHTML += `
                    <div class="summary-section">
                        <h4>Event Details</h4>
                        ${eventDate ? `<p>Date: <strong>${eventDate}</strong></p>` : ''}
                        ${eventVenue ? `<p>Venue: <strong>${eventVenue}</strong></p>` : ''}
                    </div>
                `;
            }
        }
        
        // Services
        if (this.formData.services && this.formData.services.length > 0) {
            const serviceNames = {
                'candid': 'Candid Photography',
                'film': 'Wedding Film',
                'traditional': 'Traditional Photography',
                'video': 'Traditional Video',
                'album': 'Premium Album'
            };
            
            const selectedServices = this.formData.services.map(service => 
                serviceNames[service] || service
            );
            
            summaryHTML += `
                <div class="summary-section">
                    <h4>Selected Services</h4>
                    <p><strong>${selectedServices.join(', ')}</strong></p>
                </div>
            `;
        }
        
        // Contact info
        summaryHTML += `
            <div class="summary-section">
                <h4>Contact Information</h4>
                ${this.formData.contactName ? `<p>Name: <strong>${this.formData.contactName}</strong></p>` : ''}
                ${this.formData.contactEmail ? `<p>Email: <strong>${this.formData.contactEmail}</strong></p>` : ''}
                ${this.formData.contactPhone ? `<p>Phone: <strong>${this.formData.contactPhone}</strong></p>` : ''}
                ${this.formData.preferredContact ? `<p>Preferred Contact: <strong>${this.formData.preferredContact}</strong></p>` : ''}
            </div>
        `;
        
        summaryContainer.innerHTML = summaryHTML;
    }

    showError(message) {
        // Create a simple error notification
        const existingError = document.querySelector('.error-notification');
        if (existingError) existingError.remove();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-error);
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            font-size: 14px;
            max-width: 300px;
        `;
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PhotographyInquiryForm();
});

// Add error styles
const errorStyles = `
    .form-control.error {
        border-color: var(--color-error) !important;
        background-color: rgba(var(--color-error-rgb), 0.05);
    }
    
    .form-control.error:focus {
        box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.2) !important;
    }
    
    .error-notification {
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = errorStyles;
document.head.appendChild(styleSheet);