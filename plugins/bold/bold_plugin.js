import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import AttributeCommand from '@ckeditor/ckeditor5-basic-styles/src/attributecommand';

export default class BoldPlugin extends Plugin {
    init() {
        const editor = this.editor;
        const BOLD = 'bold';

        // Allow bold attribute on text nodes.
		editor.model.schema.extend( '$text', { allowAttributes: BOLD } );

        editor.conversion.attributeToElement( {
			model: BOLD,
			view: 'strong',
			upcastAlso: [
				'b',
				{
					styles: {
						'font-weight': 'bold'
					}
				}
			]
		} );

        // Create bold command.
		editor.commands.add( BOLD, new AttributeCommand( editor, BOLD ) );

		// Set the Ctrl+B keystroke.
		editor.keystrokes.set( 'CTRL+B', BOLD );

        editor.ui.componentFactory.add( 'boldPlugin', locale => {
            const view = new ButtonView( locale );

            view.set( {
                label: 'Make bold',
                icon: imageIcon,
                tooltip: true
            } );

            view.on( 'execute', () => {
                editor.execute(BOLD);
            } );

            return view;
        } );
    }
}
