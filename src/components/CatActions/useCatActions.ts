import html2canvas from "html2canvas";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function useCatActions() {
    const [disabled, setDisabled] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (receiptRef.current) {
      receiptRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const prepareWrapper = (
    element: HTMLElement,
    options: {
      padding?: number;
      backgroundColor?: string;
    } = {}
  ) => {
    const { backgroundColor = 'var(--mantine-color-body)', padding = 32 } = options;

   

    const wrapper = document.createElement('div');
    wrapper.style.backgroundColor = backgroundColor;
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';
    wrapper.style.alignItems = 'center';

    if (padding !== undefined) {
      wrapper.style.padding = `${padding}px`;
    }

    // Clone the element to avoid modifying the original
    const clonedElement = element.cloneNode(true) as HTMLElement;
    wrapper.appendChild(clonedElement);

    // Temporarily add wrapper to document (hidden)
    wrapper.style.position = 'absolute';
    wrapper.style.left = '-9999px';
    wrapper.style.top = '-9999px';
    document.body.appendChild(wrapper);

    return wrapper;
  };

  const convertImageToDataURL = async (img: HTMLImageElement): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    });
  };

  const prepareImagesForCanvas = async (wrapper: HTMLElement) => {
    const images = wrapper.querySelectorAll('img') as NodeListOf<HTMLImageElement>;
    
    for (const img of images) {
      if (img.src.startsWith('http') && !img.src.startsWith(window.location.origin)) {
        try {
          // Create a new image element to ensure it's loaded
          const tempImg = new Image();
          tempImg.crossOrigin = 'anonymous';
          
          await new Promise<void>((resolve, reject) => {
            tempImg.onload = () => resolve();
            tempImg.onerror = () => reject(new Error(`Failed to load image: ${img.src}`));
            tempImg.src = img.src;
          });
          
          // Convert to data URL and replace the src
          const dataURL = await convertImageToDataURL(tempImg);
          img.src = dataURL;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn('Failed to convert image to data URL:', img.src, error);
          // Fallback: try without crossOrigin
          try {
            const tempImg = new Image();
            await new Promise<void>((resolve, reject) => {
              tempImg.onload = () => resolve();
              tempImg.onerror = () => reject(new Error(`Fallback image load failed: ${img.src}`));
              tempImg.src = img.src;
            });
            const dataURL = await convertImageToDataURL(tempImg);
            img.src = dataURL;
          } catch (fallbackError) {
            // eslint-disable-next-line no-console
            console.error('Image conversion failed completely:', img.src, fallbackError);
          }
        }
      }
    }
  };

  const prepareReceipt = async () => {
    if (!receiptRef.current) {
      return;
    }

    const receipt = receiptRef.current;

    const wrapper = prepareWrapper(receipt);

    try {
      // Convert external images to data URLs first
      await prepareImagesForCanvas(wrapper);
      
      const canvas = await html2canvas(wrapper, {
        useCORS: true,
        allowTaint: false,
        scale: 2, // Higher quality
        backgroundColor: null, // Preserve transparency
      });
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      
      // Convert data URL to blob for proper file creation
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      
      return new File([blob], 'receipt.jpeg', {
        type: 'image/jpeg',
      });
    } finally {
      // Clean up the temporary wrapper
      document.body.removeChild(wrapper);
    }
  };

  const handleDownload = async () => {
    const imageFile = await prepareReceipt();

    if (!imageFile) {
      return;
    }

    const a = document.createElement('a');
    const objectUrl = URL.createObjectURL(imageFile);
    a.href = objectUrl;
    a.download = 'receipt.jpeg';
    document.body.appendChild(a); // Add to DOM for better browser compatibility
    a.click();
    document.body.removeChild(a); // Clean up
    URL.revokeObjectURL(objectUrl); // Clean up memory
  };

  const handleShare = async () => {
    const imageFile = await prepareReceipt();

    if (!imageFile) {
      return;
    }

    navigator.share({
      title: 'Receipt',
      text: 'Check out this receipt',
      files: [imageFile],
    });
  };

  useLayoutEffect(() => {
    if (!navigator.share) {
      setDisabled(true);
    }
  }, []);

  return { handleDownload, handleShare, disabled, receiptRef };
}