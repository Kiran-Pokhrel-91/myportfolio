import WindowControls from '#components/WindowControls'
import WindowWrapper from '#hoc/WindowWrapper'
import { Download } from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'
import React, { useEffect, useState } from 'react'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'


pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Resume = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(600);

  useEffect(() => {
    setPageWidth(Math.min(window.innerWidth * 0.35, 560));
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const pages = Array.from({ length: numPages || 0 }, (_, i) => i + 1);

  return (
    <>
      <div id='window-header'>
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>
        <a
          href="/files/resume.pdf"
          download
          className="icon"
          title="Download Resume"
        >
          <Download />
        </a>
      </div>

      <div
        className="flex-1 overflow-y-auto p-6 flex flex-col items-center gap-6"
        style={{ maxHeight: "calc(80vh - 48px)" }}
      >
        <Document
          file="/files/resume.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center py-20">
              <p className="text-sm opacity-60">Loading resume...</p>
            </div>
          }
          error={
            <div className="text-center py-16 space-y-3">
              <p className="text-sm opacity-60">Could not preview resume.</p>
              <a
                href="/files/resume.pdf"
                download
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2 rounded-lg transition-all hover:opacity-80"
                style={{
                  backgroundColor: "var(--panel-border)",
                  color: "var(--panel-text)",
                }}
              >
                <Download size={16} />
                Download PDF
              </a>
            </div>
          }
        >
          {pages.map((p) => (
            <div
              key={p}
              className="rounded-xl overflow-hidden shadow-xl shadow-black/10 mb-5 last:mb-0"
              style={{ backgroundColor: "#fff" }}
            >
              <Page
                pageNumber={p}
                renderTextLayer
                renderAnnotationLayer
                width={pageWidth}
              />
            </div>
          ))}
        </Document>
      </div>
    </>
  )
}

const ResumeWindow = WindowWrapper(Resume, "resume")

export default ResumeWindow
