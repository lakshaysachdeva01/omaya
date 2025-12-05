/**
 * Global Custom Dropdown Functionality
 * Initializes and handles custom dropdown components
 */

(function() {
    'use strict';

    /**
     * Initialize a custom dropdown
     * @param {string} dropdownId - The ID of the dropdown container
     * @param {string} hiddenInputId - The ID of the hidden input to store the value
     * @param {Function} onSelectCallback - Optional callback when an option is selected
     */
    function initCustomDropdown(dropdownId, hiddenInputId, onSelectCallback) {
        const dropdown = document.getElementById(dropdownId);
        if (!dropdown) return;

        const dropdownSelected = dropdown.querySelector('.custom-dropdown-selected');
        const dropdownOptions = dropdown.querySelector('.custom-dropdown-options');
        const selectedText = dropdownSelected ? dropdownSelected.querySelector('.selected-text') : null;
        const optionsElements = dropdownOptions ? dropdownOptions.querySelectorAll('.dropdown-option') : [];

        if (!dropdownSelected || !dropdownOptions || !selectedText) return;

        // Toggle dropdown
        dropdownSelected.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        // Handle option selection
        optionsElements.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const value = this.getAttribute('data-value');
                
                // Don't allow selecting empty/placeholder option
                if (!value) {
                    return;
                }
                
                // Remove selected class from all options
                optionsElements.forEach(opt => opt.classList.remove('selected'));
                
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Update selected text
                const optionTitle = this.getAttribute('data-title');
                selectedText.textContent = optionTitle || this.textContent.trim();
                
                // Update hidden input if provided
                if (hiddenInputId) {
                    const hiddenInput = document.getElementById(hiddenInputId);
                    if (hiddenInput) {
                        hiddenInput.value = value;
                    }
                }
                
                // Call callback if provided
                if (onSelectCallback && typeof onSelectCallback === 'function') {
                    onSelectCallback(value, optionTitle || this.textContent.trim());
                }
                
                // Close dropdown
                dropdown.classList.remove('active');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (dropdown && !dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    /**
     * Set initial selected value for dropdown
     */
    function setInitialDropdownValue(dropdownId, hiddenInputId) {
        const hiddenInput = document.getElementById(hiddenInputId);
        if (!hiddenInput || !hiddenInput.value) return;

        const dropdown = document.getElementById(dropdownId);
        if (!dropdown) return;

        const selectedText = dropdown.querySelector('.selected-text');
        const options = dropdown.querySelectorAll('.dropdown-option');
        
        options.forEach(option => {
            if (option.getAttribute('data-value') === hiddenInput.value) {
                option.classList.add('selected');
                const title = option.getAttribute('data-title');
                if (selectedText) {
                    selectedText.textContent = title || option.textContent.trim();
                }
            }
        });
    }

    /**
     * Initialize all custom dropdowns on page load
     */
    function initAllCustomDropdowns() {
        // Initialize career form dropdown
        const experienceDropdown = document.getElementById('experienceDropdown');
        if (experienceDropdown) {
            initCustomDropdown('experienceDropdown', 'selectedExperienceValue');
        }

        // Initialize stay form dropdowns
        const stayGuestsDropdown = document.getElementById('stayGuestsDropdown');
        if (stayGuestsDropdown) {
            initCustomDropdown('stayGuestsDropdown', 'numberOfGuestsHidden');
        }

        const stayKidsDropdown = document.getElementById('stayKidsDropdown');
        if (stayKidsDropdown) {
            initCustomDropdown('stayKidsDropdown', 'kidsHidden');
            // Set initial value for kids (default is 0)
            setInitialDropdownValue('stayKidsDropdown', 'kidsHidden');
        }

        // Initialize venue form dropdowns
        const venueEventTypeDropdown = document.getElementById('venueEventTypeDropdown');
        if (venueEventTypeDropdown) {
            initCustomDropdown('venueEventTypeDropdown', 'eventTypeHidden');
        }

        const venuePreferredVenueDropdown = document.getElementById('venuePreferredVenueDropdown');
        if (venuePreferredVenueDropdown) {
            initCustomDropdown('venuePreferredVenueDropdown', 'preferredVenueHidden');
            // Set initial value if pre-selected
            setInitialDropdownValue('venuePreferredVenueDropdown', 'preferredVenueHidden');
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllCustomDropdowns);
    } else {
        initAllCustomDropdowns();
    }

    // Export for manual initialization if needed
    window.initCustomDropdown = initCustomDropdown;
})();


