/**
 * Modal component
 * 
 * @module component-modal
 * @version 1.0.0
 * @extends HTMLElement
 */

 customElements.component = 'component-modal';

 if (!customElements.get(customElements.component)) {
 
     class ComponentModal extends HTMLElement {

    /**
     * Modal web component
     * 
     * @constructor
     */
    constructor() {

        super();

        this.querySelectorAll('[data-modal]').forEach(item => {
            this.initEvents(item);
        });
    }
 
     /**
	 * Init modal events   
     * 
     * @param {item} item A modal object.
     * @returns {undefined}
	 */

    initEvents(item)  {  
        let name = item.dataset.modalName;
        let btnClose = item.querySelector('[data-modal-close]');
        let btnsOpen = this.querySelectorAll('[data-modal-open=' + name + ' ]');

        if(btnsOpen) {  

            btnsOpen.forEach(btn => {

                btn.classList.add("with-modal");

                // Open modal when click on btn open
                btn.addEventListener('click', event => {
                    event.preventDefault();     

                    this.open(item);        
                });

            });
            
            // Close modal when click on btn close
            btnClose.addEventListener('click', event => {
                event.preventDefault();
    
                this.close(item);
    
            });
    
            // Close modal when click on overlay
            item.addEventListener('click', event => {
                if (event.target == item) {
                    this.close(item);
                }
            });
    
            // Close modal on press escape
            window.addEventListener('escape', (event) => {
                event.preventDefault();
    
                this.close(item, event);
    
            });

        }
    }

    /**
	 * Open modal
     * 
     * @param {item} item A modal object.
     * @returns {undefined}
	 */

    open (item)  {        
        item.classList.add('active');
        item.setAttribute('aria-hidden', 'false');

        document.querySelector('body').classList.add('modal-active');

        setTimeout(() => {
            this.initFocusTrap(item);
            this.activeFocusTrap();
            item.querySelector('[data-modal-close]').focus();
        }, 100);
    }

    /**
	 * Close modal 
     * 
     * @param {item} item A modal object.
     * @returns {undefined}
	 */
    close (item)  {  

        item.classList.remove('active');
        item.setAttribute('aria-hidden', 'true');

        document.querySelector('body').classList.remove('modal-active');

        this.disableFocusTrap();
    }

	/**
	 * Init modal focus trap
     * 
     * @returns {undefined}
	 */
     initFocusTrap(item)  {

        this.focusTrap = focusTrap.createFocusTrap(item, { clickOutsideDeactivates: true });

    }

	/**
	 * Ative modal focus trap
     * 
     * @returns {undefined}
	 */
	 activeFocusTrap()  {

        if (this.focusTrap) {
            this.focusTrap.activate();
        }

    }

	/**
	 * Disable modal focus trap
     * 
     * @returns {undefined}
	 */
	disableFocusTrap() {

		if (this.focusTrap) {
			this.focusTrap.deactivate();
		}

	}
}

customElements.define(customElements.component, ComponentModal);
}
