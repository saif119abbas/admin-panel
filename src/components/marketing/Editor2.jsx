
import { Editor } from '@tinymce/tinymce-react';

export default function MyEditor({ value, onChange }) { // Changed from [value, onChange] to ({ value, onChange })
  return (
    <div>
      <Editor
        apiKey="8n29s7xnau5sbz6j2wtxlhvdk6xgw13ykhk1dp1ifiz7hsd0"
        value={value} // controlled value
        onEditorChange={(newValue) => onChange(newValue)} // update state
        init={{
          plugins: [
            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists',
            'media', 'searchreplace', 'table', 'visualblocks', 'wordcount', 'checklist',
            'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker',
            'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode',
            'advtemplate', 'ai', 'uploadcare', 'mentions', 'tinycomments',
            'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography',
            'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
          ],
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | ' +
            'addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | ' +
            'align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          ai_request: (request, respondWith) =>
            respondWith.string(() =>
              Promise.reject('See docs to implement AI Assistant')
            ),
          uploadcare_public_key: 'bc77639eac329792c651',
        }}
      />

      {/* Show live content preview */}
      <div className="mt-4 p-2 border rounded">
        <h3>Live Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </div>
    </div>
  );
}