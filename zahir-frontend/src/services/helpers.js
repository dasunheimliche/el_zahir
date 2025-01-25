export function copyToClipboard(postURL) {
  navigator.clipboard.writeText(postURL);
}

export function doNothing(e) {
  e.preventDefault();
}

export async function scrollToTop(ref) {
  ref.current.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

export function getConfig() {
  if (window.localStorage.getItem('token') === null) return;

  const tokenString = window.localStorage.getItem('token');

  if (!tokenString) return;

  const token = `Bearer ${tokenString}`;

  return {
    headers: {
      Authorization: token,
    },
  };
}

export function isImageInputValid(url, file, mode) {
  const urlIsValid =
    (url.endsWith('.jpg') ||
      url.endsWith('.png') ||
      url.endsWith('.bmp') ||
      url.endsWith('.gif') ||
      url.endsWith('.webp') ||
      url.endsWith('.tiff')) &&
    url.length > 0
      ? true
      : false;

  const fileIsValid = file && file.type?.startsWith('image/') ? true : false;

  if (mode === 'url') return urlIsValid ? false : 'invalid url';

  if (mode === 'file') return fileIsValid ? false : 'invalid file';

  if (mode === 'idle') return false;

  return false;
}

export function isVideoInputValid(url, file, mode) {
  function isYoutubeUrl(link) {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w-]{10,12})(?:$|&)/;
    return regExp.test(link);
  }

  const urlIsValid =
    (url.endsWith('.webm') ||
      url.endsWith('.mp4') ||
      url.endsWith('.mov') ||
      isYoutubeUrl(url)) &&
    url.length > 0
      ? true
      : false;

  const fileIsValid = file && file.type.startsWith('video/') ? true : false;

  if (mode === 'url') return urlIsValid ? false : 'invalid url';

  if (mode === 'file') return fileIsValid ? false : 'invalid file';

  if (mode === 'idle') return false;

  return false;
}
