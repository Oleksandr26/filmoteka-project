import lsAPI from './localestorage';
import { Notify } from 'notiflix';
import libraryMarkup from './libraryMarkup';
import getPagination from './pagination';

const libraryEl = document.querySelector('.js-library');
const watchedBtn = document.querySelector('.js-watched');
const queueBtn = document.querySelector('.js-queue');
const container = document.getElementById('tui-pagination-container');

watchedBtn.addEventListener('click', btnClick);
queueBtn.addEventListener('click', btnClick);

const LS_WATCHED_KEY = 'watched';
const LS_QUEUE_KEY = 'queue';
const LS_LIBRARY_STATE = 'library-state';

let watchList = lsAPI.load(LS_WATCHED_KEY);
watchList = watchList ? watchList : [];

let queueList = lsAPI.load(LS_QUEUE_KEY);
queueList = queueList ? queueList : [];

let pagination, perPage, currentPage;

export function btnClick(btn) {
    if (typeof btn !== 'string') {
        btn = btn.target.name;
    }

    if (btn === 'queue') {
        watchedBtn.classList.remove('active');
        queueBtn.classList.add('active');
    } else {
        watchedBtn.classList.add('active');
        queueBtn.classList.remove('active');
    }
    lsAPI.save(LS_LIBRARY_STATE, btn);
    onPagination(btn);
}

function onPagination(btn) {
    if (window.innerWidth >= 1280) {
        perPage = 9;
    } else if (window.innerWidth >= 768) {
        perPage = 8;
    } else perPage = 4;

    if (lsAPI.load(btn)) {
        pagination = getPagination(lsAPI.load(btn).length, perPage);
        container.removeAttribute('style');
        pagination.on('afterMove', event => {
            // currentPage = event.page;
            // render(btn);
            libraryEl.innerHTML = libraryMarkup(
                lsAPI
                    .load(btn)
                    .slice(event.page * perPage - perPage, event.page * perPage)
            );
        });

        pagination.movePageTo(1);
    } else {
        // console.log('Чистота');
        container.setAttribute('style', 'display: none');
        libraryEl.innerHTML = '';
        Notify.info('Your library is empty. You can add something');
    }
}

export const libraryList = {
    render(ls) {
        libraryEl.innerHTML = libraryMarkup(
            lsAPI
                .load(ls)
                .slice(currentPage * perPage - perPage, currentPage * perPage)
        );
    },
};
