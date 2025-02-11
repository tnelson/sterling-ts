import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { ForgeParser, ExprContext } from './ForgeParser';
import { ForgeLexer } from './ForgeLexer';
import { ForgeListenerImpl } from './ForgeListenerImpl';
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker';
import { ForgeExprEvaluator } from './forgeExprEvaluator';
import { DatumParsed } from '@/sterling-connection';

export class ForgeUtil {

	datum: DatumParsed<any>;
	instanceIndex: number;
	forgeListener : ForgeListenerImpl = new ForgeListenerImpl();
	walker : ParseTreeWalker = new ParseTreeWalker();

	constructor(datum: DatumParsed<any>, instanceIndex: number) {
		this.datum = datum;
		this.instanceIndex = instanceIndex;
	}

	getExpressionParseTree(forgeExpr: string) {
    const inputStream = CharStreams.fromString(forgeExpr);
    const lexer = new ForgeLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new ForgeParser(tokenStream);
    parser.buildParseTree = true;
    
    // Parse the input using the new entry point
    const tree = parser.parseExpr();
    
    return tree;
	}

	evaluateExpression(forgeExpr: string) {
    const tree = this.getExpressionParseTree(forgeExpr);
    const evaluator = new ForgeExprEvaluator(this.datum, this.instanceIndex);

		// ensure we're visiting an ExprContext
		return evaluator.visit(tree instanceof ExprContext ? tree : tree.getChild(0));
	}
}