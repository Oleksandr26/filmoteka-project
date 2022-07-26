import * as basicLightbox from 'basiclightbox';
import photo1 from '../images/photo_1.jpg';
import photo2 from '../images/photo_2.jpg';
import photo3 from '../images/photo_3.jpg';
import photo4 from '../images/photo_4.jpg';
import photo5 from '../images/photo_5.jpg';
import close from '../images/icons.svg';

const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    modal: document.querySelector('[data-modal]'),
};
refs.openModalBtn.addEventListener('click', openModal);

const modal = basicLightbox.create(
    `<div class="modal" data-modal>
            <button type="button" class="movies-modal__close-btn" data-modal-close>
      <svg class="movies-modal__close-icon" width="16" height="16">
        <use href="${close}#icon-close"></use>
      </svg>
    </button>
    <div class="modal__team">TEAM "the big code theory"</div>
            <div class="modal__photos">
            <div class="modal__thumb">
            <div class="modal__images">
            <img class="modal__photo" src="${photo3}" width="100" alt="Kate photo"/>
                <h3 class="modal__name">Катерина Загоруй</h3>
                <h4>Team Lead</h4>
                <p>Frontend Developer</p>
            </div>

            <div class="modal__images">
            <img class="modal__photo" src="${photo2}" width="100" alt="Serg photo"/>
                <h3 class="modal__name">Сергій Соловйов</h3>
                <h4>Scram Masper</h4>
                <p>Frontend Developer</p>
            </div>
            </div>
             
            <div class="modal__thumb">
                  <div class="modal__images">
                <img class="modal__photo" src="${photo1}" width="100"  alt="Oleg photo"/>
                <h3 class="modal__name">Олег Чучин</h3>
                <p>Frontend Developer</p>     
                
            </div>
            
            <div class="modal__images">
            <img class="modal__photo" src="${photo4}" width="100" alt="Andrey photo">
                <h3 class="modal__name">Андрій Макаров</h3>
                <p>Frontend Developer</p>
            </div>

            <div class="modal__images">
            <img class="modal__photo" src="${photo5}" width="100" alt="Alex photo">
                <h3 class="modal__name">Олександр Алемаев</h3>
                <p>Frontend Developer</p>
            </div>
            </div>
       
           </div>
        </div> `,
    {
        onShow: () => window.addEventListener('keydown', clickEsc),
        onClose: () => window.removeEventListener('keydown', clickEsc),
    }
);

function openModal(event) {
    event.preventDefault();
    modal.show();
    const closeModalBtn = document.querySelector('[data-modal-close]');
    closeModalBtn.addEventListener('click', () => {
        modal.close();
    });
}

function clickEsc(event) {
    if (event.key === 'Escape') {
        modal.close();
    }
}
