export default function generateTable(block) {
  const { data, tunes } = block;
  const alignment = tunes?.alignmentTuneTool?.alignment;
  const align = alignment || "left";
  const content = data?.withHeadings ? data?.content.slice(1) : data?.content;
  const header = data?.withHeadings ? data?.content[0] : data?.header;
  const withRowHeadings = !!data?.header;

  function generateTHead(row) {
    return `
      <thead>
        <tr>
          ${row.map((cell, i) => `<th scope="col">${cell}</th>`).join("")}
        </tr>
      </thead>
    `;
  }

  function generateTr(row, withHeadings) {
    return `
      <tr>
        ${row
          .map((cell, i) =>
            i === 0 && withHeadings
              ? `<th scope="row">${cell}</th>`
              : `<td>${cell}</td>`
          )
          .join("")}
      </tr>
    `;
  }

  function generateTableFooter() {
    if (data?.footer) {
      return `
        <tfoot>
          ${generateTr(data?.footer, withRowHeadings)}
        </tfoot>
      `;
    }
    return "";
  }

  function escapeHtml(unsafe) {
    return unsafe.replace(
      /[&<"']/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          '"': "&quot;",
          "'": "&#039;",
        }[m])
    );
  }

  const table = `
    <div class="d-flex align-center justify-content-center">
      <table class="table" style="text-align: ${align}">
        
        ${header ? generateTHead(header) : ""}
        <tbody>
          ${
            content
              ? content.map((row) => generateTr(row, withRowHeadings)).join("")
              : ""
          }
        </tbody>
        ${generateTableFooter()}
      </table>
    </div>
  `;

  return table;
}
