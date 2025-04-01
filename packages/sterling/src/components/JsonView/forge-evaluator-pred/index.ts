import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { ForgeParser, ExprContext, PredDeclContext } from './ForgeParser';
import { ForgeLexer } from './ForgeLexer';
import { ForgeListenerImpl } from './ForgeListenerImpl';
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker';
import { ForgeExprEvaluator } from './forgeExprEvaluator';
import { DatumParsed } from '@/sterling-connection';
import { Predicate } from '../predicate-extractor/predicate-extractor';

export class ForgePredUtil {

	datum: DatumParsed<any>;
	instanceIndex: number;
	predicates: Predicate[];
	forgeListener : ForgeListenerImpl = new ForgeListenerImpl();
	walker : ParseTreeWalker = new ParseTreeWalker();
	gotPredicateParseTrees;

	constructor(datum: DatumParsed<any>, instanceIndex: number, predicates: Predicate[]) {
		this.datum = datum;
		this.instanceIndex = instanceIndex;
		this.predicates = predicates;
		this.gotPredicateParseTrees = false;
	}

	// helper function
	private getPredicateParseTrees() {
		for (const predicate of this.predicates) {
			const tree = this.getPredParseTree(predicate.predicateString);
			predicate.predTree = tree;
		}
		this.gotPredicateParseTrees = true;
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
		// get the parse trees for all the predicates before we do anything else
		if (!this.gotPredicateParseTrees) {
			this.getPredicateParseTrees();
		}

		// now, we can actually evaluate the expression
    const tree = this.getExpressionParseTree(forgeExpr);
    const evaluator = new ForgeExprEvaluator(this.datum, this.instanceIndex, this.predicates);

		// ensure we're visiting an ExprContext
		return evaluator.visit(tree instanceof ExprContext ? tree : tree.getChild(0));
	}

	getPredParseTree(forgePred: string) {
		const inputStream = CharStreams.fromString(forgePred);
		const lexer = new ForgeLexer(inputStream);
		const tokenStream = new CommonTokenStream(lexer);
		const parser = new ForgeParser(tokenStream);
		parser.buildParseTree = true;

		// Parse the input using the new entry point
		const tree = parser.predDecl();

		return tree;
	}

	evaluatePredicate(forgePred: string) {
		console.log('forgePred:', forgePred);
		const tree = this.getPredParseTree(forgePred);
		console.log('tree:', tree);
		const evaluator = new ForgeExprEvaluator(this.datum, this.instanceIndex, this.predicates);

		// ensure we're visiting a PredDeclContext
		console.log('about to visit!');
		return evaluator.visit(tree);
	}
}