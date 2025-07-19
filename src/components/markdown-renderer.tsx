
"use client";

import React from 'react';

// This is a VERY basic Markdown to HTML renderer. 
// For a production app, a more robust library like 'react-markdown' with 'rehype-raw' would be recommended
// to handle HTML safely and support a wider range of Markdown features.
export const MarkdownRenderer = ({ content }: { content: string }) => {
    
    // Replace Markdown headings
    let htmlContent = content
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-6 mb-4 pb-2 border-b">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-5 mb-3 pb-2 border-b">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      
      // Replace bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')

      // Replace list items
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      // A simple way to wrap consecutive list items in a <ul>. This is brittle.
      .replace(/(<li>.*<\/li>)/gs, '<ul class="list-disc list-outside space-y-1 my-3 pr-5">$1</ul>')
      // Clean up multiple <ul> tags that might be created
      .replace(/<\/ul>\s*<ul class="list-disc list-outside space-y-1 my-3 pr-5">/g, '')

      // Replace newlines with <br /> for line breaks
      .replace(/\n/g, '<br />');

    // Handle Markdown tables
    const tableRegex = /((?:\|.*\|<br \/>)+)/g;
    htmlContent = htmlContent.replace(tableRegex, (match) => {
        const rows = match.trim().split('<br />').filter(row => row.trim() !== '');
        if (rows.length < 2) return match; // Not a valid table

        const headerRow = rows[0];
        const separatorRow = rows[1];
        const bodyRows = rows.slice(2);

        // Basic check for table structure
        if (!separatorRow.includes('---')) return match;

        const headers = headerRow.split('|').map(h => h.trim()).filter(Boolean);
        const tableHead = `<thead><tr class="border-b">${headers.map(h => `<th class="p-2 text-right font-medium text-muted-foreground">${h}</th>`).join('')}</tr></thead>`;

        const tableBody = `<tbody>${bodyRows.map(row => {
            const cells = row.split('|').map(c => c.trim()).filter(Boolean);
            return `<tr class="border-b">${cells.map(c => `<td class="p-2">${c}</td>`).join('')}</tr>`;
        }).join('')}</tbody>`;

        return `<div class="overflow-x-auto my-4"><table class="w-full text-sm">${tableHead}${tableBody}</table></div>`;
    });

    return <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
