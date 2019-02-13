import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import pencil from '@ckeditor/ckeditor5-core/theme/icons/pencil.svg';
import AttributeCommand from '@ckeditor/ckeditor5-basic-styles/src/attributecommand';

export default class UppercasePlugin extends Plugin {
    init() {
        const editor = this.editor;
        const SPAN = 'span';

        editor.model.schema.extend( '$text', { allowAttributes: SPAN } );

        editor.conversion.attributeToElement( {
			model: SPAN,
            view: {
                name: 'span',
                classes: 'super_class',
                styles: {
                    'font-size': '32px'
                }
            }
		} );

		editor.commands.add('makeUppercase', new AttributeCommand( editor, SPAN ) );

        editor.ui.componentFactory.add( 'uppercasePlugin', locale => {
            const view = new ButtonView( locale );

            view.set( {
                label: 'Make uppercase',
                icon: pencil,
                tooltip: true
            } );

            view.on( 'execute', () => {
                editor.execute('makeUppercase');
            } );

            return view;
        } );
    }
}
