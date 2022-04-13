/**
 * Component Accordion
 * 
 * @module component-accordion
 * @version 1.0.0
 * @extends HTMLElement
 */

customElements.component = 'component-accordion';

if (!customElements.get(customElements.component)) {
    class componentAccordion extends HTMLElement {

        /**
         * Accordion web component.
         * 
         * @constructor
         */
        constructor() {

        super();
        
        this.initEvents();
        }

        /**
         * Init component events.
         * 
         * @returns {undefined}
         */
        initEvents() {

            this.accordion = this.querySelector('[data-accordion]');
            this.heading = this.querySelector('[data-accordion-heading]');

            if (!this.accordion || !this.heading)
                return false;
        
            this.loadAttributes();

            this.heading.addEventListener('click', event => {
                event.preventDefault();

                // We need to use a promisse to avoid issues with accordion
                this.toggle(this.heading).then((newContentHeight) => {
                    this.applyMaxHeightOnParent(newContentHeight);
                });
            });
        }

        /**
         * Load accordion attributes
         * 
         * @param {object} accordion A accordion object.
         * @return {undefined}
         */
        loadAttributes(){

            let id = Math.floor(Math.random() * 10000);

            this.heading.parentElement.classList.add('accordion__item');

            this.heading.classList.add('accordion__heading');
            this.heading.setAttribute('aria-expanded', 'false');
            this.heading.setAttribute('aria-controls', 'accordion__content' + id);
            this.heading.id = 'accordion__heading__' + id;

            this.heading.nextElementSibling.classList.add('accordion__content');
            this.heading.nextElementSibling.classList.add('hidden');
            this.heading.nextElementSibling.setAttribute('role', 'region');
            this.heading.nextElementSibling.setAttribute('aria-labelledby', 'accordion__heading__' + id);
            this.heading.nextElementSibling.id = 'accordion__content__' + id;
        }

        /**
         * Init Accordion toggle
         * 
         * @returns {Promise} Promise object represents a number.
         */
        toggle() {

            return new Promise((resolve, reject) => {

                let content = this.heading.nextElementSibling;

                if (content) {

                    let container = this.heading.parentElement;
                    
                    if (container.classList.contains('active')) {

                        // Close Accordion
                        container.classList.remove('active');
                        content.style.maxHeight = null;
                        this.heading.setAttribute('aria-expanded', 'false');

                        // We need to use set time out to avoid issues with accordion animation
                        setTimeout(() => {
                            content.classList.add('hidden');
                        }, 500);

                    } else {

                        // Open Accordion
                        container.classList.add('active');
                        content.classList.remove('hidden');
                        content.style.maxHeight = content.scrollHeight + "px";
                        this.heading.setAttribute('aria-expanded', 'true');
                    }

                    resolve(content.scrollHeight);
                }
            });
        }

        /**
         * Change the parent max-height (submenu)
         * @param {integer} newContentHeight A data-accordion-content height
         * @return {undefined}
         */
        applyMaxHeightOnParent(newContentHeight) {

            let parent = this.heading.closest('.accordion__content');

            if(parent) {
                if(parent.classList.contains('accordion__content')){
                    const isOpen = this.heading.getAttribute('aria-expanded');
        
                    if(isOpen == 'true'){
                        parent.style.maxHeight = parent.scrollHeight + newContentHeight + "px";
                    }
                }
            }
        }
    }

    customElements.define(customElements.component, componentAccordion);
}