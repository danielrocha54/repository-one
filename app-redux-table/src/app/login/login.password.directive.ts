import { ElementRef, Directive } from '@angular/core';

@Directive({
  selector: '[appLoginPassword]'
})
export class LoginPasswordDirective {

	private _shown = false;

	constructor(private el: ElementRef) {

		const parent = this.el.nativeElement.parentNode;
		const span = document.createElement('span');
		span.innerHTML = '<span class="input-group-btn"><button class="btn btn-default" type="button""><i class="fas fa-eye fa-1x"></button></span>';
		span.addEventListener('click', (event) => {
			this.toggleVisibility(span);
		});
		parent.appendChild(span);

	}

	toggleVisibility(span: HTMLElement) {

		this._shown = !this._shown;
		
		if (this._shown) {
			this.el.nativeElement.setAttribute('type', 'text');
			span.innerHTML = '<span class="input-group-btn"><button class="btn btn-default" type="button""><i class="fas fa-eye-slash fa-1x"></button></span>';
		} else {
			this.el.nativeElement.setAttribute('type', 'password');
			span.innerHTML = '<span class="input-group-btn"><button class="btn btn-default" type="button""><i class="fas fa-eye fa-1x"></button></span>';
		}

	}

}
